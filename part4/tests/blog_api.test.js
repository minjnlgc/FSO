const { test, after, beforeEach } = require("node:test");
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

test("get all blogs - returned json format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("get all blogs - returned correct number of blogs", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, helper.initialBlogs.length); // just like using === to compare
});

test("get all blogs - verify the unique identifier of blog is id", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((blog) => {
    assert(blog.hasOwnProperty("id"));
  });
});

test("create new blogs - number of blogs increased by one, and content saved", async () => {
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

test("create new blogs - likes property missing would be set to zero", async () => {
  const newBlog = {
    title: "Evil Does Not Exist",
    author: "Ryusuke Hamaguchi",
    url: "https://en.wikipedia.org/wiki/Evil_Does_Not_Exist",
  };

  const savedBlog = await api.post("/api/blogs").send(newBlog);
  assert.strictEqual(savedBlog.body.likes, 0);
});

test("create new blogs - missing title or url should return 400 Bad Request", async () => {
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

after(async () => {
  await mongoose.connection.close();
});
