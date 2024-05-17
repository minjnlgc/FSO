const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../model/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObject = helper.initialBlogs.map((blog) => Blog(blog));
  const promiseArray = blogObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("get all blogs", () => {
  test("get all blogs 1 - returned json format", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("get all blogs 2 - returned correct number of blogs", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length); // just like using === to compare
  });

  test("get all blogs 3 - verify the unique identifier of blog is id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => {
      assert(blog.hasOwnProperty("id"));
    });
  });
});

describe("create new blogs", () => {
  test("create new blogs 1 - number of blogs increased by one, and content saved", async () => {
    const newBlog = {
      title: "Evil Does Not Exist",
      author: "Ryusuke Hamaguchi",
      url: "https://en.wikipedia.org/wiki/Evil_Does_Not_Exist",
      likes: 6,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogAtEnd = await helper.getBlogsInDB();
    assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1);

    const titles = blogAtEnd.map((b) => b.title);
    assert(titles.includes(newBlog.title));
  });

  test("create new blogs 2 - likes property missing would be set to zero", async () => {
    const newBlog = {
      title: "Evil Does Not Exist",
      author: "Ryusuke Hamaguchi",
      url: "https://en.wikipedia.org/wiki/Evil_Does_Not_Exist",
    };

    const savedBlog = await api.post("/api/blogs").send(newBlog);
    assert.strictEqual(savedBlog.body.likes, 0);
  });

  test("create new blogs 3 - missing title or url should return 400 Bad Request", async () => {
    const newBlogMissingTitle = {
      author: "Ryusuke Hamaguchi",
      url: "https://en.wikipedia.org/wiki/Evil_Does_Not_Exist",
    };

    const newBlogMissingUrl = {
      author: "Ryusuke Hamaguchi",
      title: "Evil Does Not Exist",
    };

    const newBlogMissingExpectAuthor = {
      author: "Ryusuke Hamaguchi",
    };

    await api.post("/api/blogs").send(newBlogMissingExpectAuthor).expect(400);
    await api.post("/api/blogs").send(newBlogMissingTitle).expect(400);
    await api.post("/api/blogs").send(newBlogMissingUrl).expect(400);
  });
});

describe("remove one blog", () => {
  test("remove one blog 1 - deleted the blog if the id is valid", async () => {
    const blogsAtStart = await helper.getBlogsInDB();
    const id = blogsAtStart[0].id;

    await api
      .delete(`/api/blogs/${id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.getBlogsInDB();
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

    const blogsAtEndTitles = blogsAtEnd.map((b) => b.title);
    assert(!blogsAtEndTitles.includes(blogsAtStart[0].title));
  });

  test("remove one blog 2 - cannot the blog if the id is invalid", async () => {
    const blogsAtStart = await helper.getBlogsInDB();

    const id = await helper.nonExistingId();
    await api.delete(`/blogs/api/${id}`).expect(404);

    const blogsAtEnd = await helper.getBlogsInDB();
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
  });
});

describe("update blog by id", () => {
  test("update blog by id 1 - request body only have likes and it works", async () => {
    const blogsAtStart = await helper.getBlogsInDB();
    const id = blogsAtStart[0].id;

    const updatesLikes = {
      likes: 10,
    };

    const updatedBlog = await api
      .put(`/api/blogs/${id}`)
      .send(updatesLikes)
      .expect(200);

    assert.strictEqual(updatedBlog._body.likes, updatesLikes.likes);
  });

  test("update blog by id 2 - validation still working if request body invalid", async () => {
    const blogsAtStart = await helper.getBlogsInDB();
    const id = blogsAtStart[0].id;

    const updatesLikes = {
      likes: "i dont know",
    };

    await api.put(`/api/blogs/${id}`).send(updatesLikes).expect(400);
  });

  test("update blog by id 3 - invalid id would not update and recieve 404 not found", async () => {
    const id = await helper.nonExistingId();

    const updatesLikes = {
      likes: 10
    };

    await api.put(`/api/blogs/${id}`).send(updatesLikes).expect(404);
  });

});

after(async () => {
  await mongoose.connection.close();
});
