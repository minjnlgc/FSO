const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog, likeABlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    // empty db
    await request.post("/api/testing/reset");

    // create a user for backend
    await request.post("/api/users", {
      data: {
        username: "hellas",
        name: "Arto Hellas",
        password: "12345678",
      },
    });

    await request.post("/api/users", {
      data: {
        username: "test",
        name: "test test",
        password: "12345678",
      },
    });

    await page.goto("");
  });

  test("Login form is shown", async ({ page }) => {
    const locator = await page.getByText("log in to application");
    await expect(locator).toBeVisible();
    await expect(page.getByTestId("username")).toBeVisible();
    await expect(page.getByTestId("password")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "hellas", "12345678");
      await expect(page.getByText("Arto Hellas logged in")).toBeVisible();
      await expect(page.getByText("login successfully!")).toHaveClass(
        "success"
      );
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "hellas", "wrong");
      await expect(
        page.getByText("invalid username or password")
      ).toBeVisible();
      await expect(page.getByText("invalid username or password")).toHaveClass(
        "fail"
      );
      await expect(page.getByText("invalid username or password")).toHaveCSS(
        "color",
        "rgb(212, 20, 6)"
      );
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "hellas", "12345678");
    });

    test("a new blog can be created", async ({ page }) => {
      const title = "testing title ...";
      const author = "testing author ...";
      const url = "www.testing.com";

      await createBlog(page, title, author, url);
      await expect(page.getByText(`${title} ${author}`)).toBeVisible();
    });

    describe("Blog can be edited", () => {
      const title = "testing ceate blog";
      const author = "abc";
      const url = "www.testing.com";
      const likes = 0;

      beforeEach(async ({ page }) => {
        await createBlog(page, title, author, url);
      });

      test("user could likes a blogs and the number of likes would increased by 1", async ({
        page,
      }) => {
        const testBlog = await page.getByText(`${title} ${author}`);
        await testBlog.getByRole("button", { name: "View" }).click();
        await page
          .getByTestId("likes")
          .getByRole("button", { name: "like" })
          .click();

        await expect(page.getByTestId("likes")).toHaveText(`${likes + 1} like`);
      });

      test("a blog can be deleted by who created it", async ({ page }) => {
        const testBlog = await page.getByText(`${title} ${author}`);
        await testBlog.getByRole("button", { name: "View" }).click();

        page.on("dialog", async (dialog) => {
          expect(dialog.type()).toContain("confirm");
          expect(dialog.message()).toEqual(`Remove ${title} by ${author}?`);
          await dialog.accept();
        });

        await page.getByRole("button", { name: "delete" }).click();
        await expect(
          page.getByText(`successfully deleted ${title} by ${author}!`)
        ).toBeVisible();
        await expect(page.getByText(`${title} hide`)).not.toBeVisible();
      });

      test("user who did not create the blog cannot see the delete button", async ({
        page,
      }) => {
        await page.getByRole("button", { name: "logout" }).click();
        await loginWith(page, "test", "12345678");

        const testBlog = await page.getByText(`${title} ${author}`);
        await testBlog.getByRole("button", { name: "View" }).click();

        await expect(
          page.getByRole("button", { name: "delete" })
        ).not.toBeVisible();
      });
    });

    test("blogs listed in the descending order according to the likes", async ({
      page,
    }) => {
      test.slow();

      await createBlog(page, "least like blog", "last", "last.com");
      await page
        .getByText("least like blog")
        .getByRole("button", { name: "View" })
        .click();
      await page.getByRole("button", { name: "like" }).click();

      await createBlog(page, "most like blog", "first", "first.com");
      await page
        .getByText("most like blog")
        .getByRole("button", { name: "View" })
        .click();
      await page.getByRole("button", { name: "like" }).nth(1).click();
      await page.waitForTimeout(500); // Wait for the like to be updated
      await page.getByRole("button", { name: "like" }).nth(1).click();
      await page.waitForTimeout(500); // Wait for the like to be updated
      await page.getByRole("button", { name: "like" }).nth(1).click();

      await createBlog(page, "middle like blog", "mid", "mid.com");
      await page
        .getByText("middle like blog")
        .getByRole("button", { name: "View" })
        .click();
      await page.getByRole("button", { name: "like" }).nth(2).click();
      await page.waitForTimeout(500); // Wait for the like to be updated
      await page.getByRole("button", { name: "like" }).nth(2).click();
      await page.waitForTimeout(500); // Wait for the like to be updated

      await page.reload();

      await page
        .getByText("most like blog")
        .getByRole("button", { name: "View" })
        .click();
      await page
        .getByText("middle like blog")
        .getByRole("button", { name: "View" })
        .click();
      await page
        .getByText("least like blog")
        .getByRole("button", { name: "View" })
        .click();

      const likes = await page
        .locator('[data-testid="likes"]')
        .allTextContents();
      expect(likes).toEqual(["3 like", "2 like", "1 like"]);
    });
  });
});
