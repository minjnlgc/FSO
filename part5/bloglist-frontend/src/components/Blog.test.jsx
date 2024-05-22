import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { describe, expect } from "vitest";

describe("<Blog />", () => {
  const blog = {
    title: "test-title",
    author: "test-author",
    url: "www.test.com",
    likes: 1,
    user: {
      id: "a",
    },
  };

  test("render the blog displaying title and author but no likes or URL", async () => {
    // Make a test, which checks that the component displaying a blog renders the blog's title and author,
    // but does not render its URL or number of likes by default.

    const { container } = render(<Blog blog={blog} />);

    const div = container.querySelector(".blog-default-view");

    expect(div).toHaveTextContent(`${blog.title} ${blog.author}`);
    expect(div).not.toHaveStyle("display: none");

    expect(div).not.toHaveTextContent(blog.url);
    expect(div).not.toHaveTextContent(blog.likes);
  });

  test("blog's URL and likes are not shown before button clicked", () => {
    const { container } = render(<Blog blog={blog} />);

    const div = container.querySelector(".blog-hide-content");
    expect(div).toHaveStyle("display: none");
  });

  test("blog's URL and likes are shown after button clicked", async () => {
    //Make a test, which checks that the blog's URL and number of likes are shown
    //when the button controlling the shown details has been clicked.

    const { container } = render(<Blog blog={blog} />);

    const user = userEvent.setup();
    const button = screen.getByText("View");
    await user.click(button);

    const div = container.querySelector(".blog-hide-content");
    expect(div).not.toHaveStyle("display: none");
  });

  test("when like button is clicked twice, the component's recieved props called twice", async () => {
    // Make a test, which ensures that if the like button is clicked twice,
    // the event handler the component received as props is called twice.

    const updateLikes = vi.fn();
    const user = userEvent.setup();

    render(<Blog blog={blog} handleUpdateBlog={updateLikes} />);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(updateLikes.mock.calls).toHaveLength(2);
  });
});
