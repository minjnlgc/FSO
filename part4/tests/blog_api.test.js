const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../model/blog");
const User = require("../model/user");

const api = supertest(app);

describe("blogs test", () => {
  beforeEach(async () => {
    // initialise blog
    await Blog.deleteMany({});

    const blogObject = helper.initialBlogs.map((blog) => Blog(blog));
    const promiseArray = blogObject.map((blog) => blog.save());
    await Promise.all(promiseArray);

    // initialise user
    await User.deleteMany({});

    const password = "12345678";

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: "hellas",
      name: "Arto Hellas",
      passwordHash: passwordHash,
    });

    await newUser.save();
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

  describe("create new blogs, but have to provide token", () => {
    test("create new blogs 1 - number of blogs increased by one, and content saved", async () => {
      const newBlog = {
        title: "Evil Does Not Exist",
        author: "Ryusuke Hamaguchi",
        url: "https://en.wikipedia.org/wiki/Evil_Does_Not_Exist",
        likes: 6,
      };

      const token = await helper.userToken();

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
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

      const token = await helper.userToken();

      const savedBlog = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog);
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

      const token = await helper.userToken();

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlogMissingExpectAuthor)
        .expect(400);
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlogMissingTitle)
        .expect(400);
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlogMissingUrl)
        .expect(400);
    });

    test('create new blogs 4 - cannot create new blog if token invalid', async () => {
      
      const blogsAtStart = await Blog.find({});
      
      const newBlog = {
        title: "Evil Does Not Exist",
        author: "Ryusuke Hamaguchi",
        url: "https://en.wikipedia.org/wiki/Evil_Does_Not_Exist",
      };

      const nonExistingUserToken = await helper.nonExistingUserToken();
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${nonExistingUserToken}`)
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/);

      const blogAtEnd = await Blog.find({});
      assert(blogAtEnd.length, blogsAtStart.length)
    });

    test('create new blogs 5 - cannot create new blog if no token provided', async () => {
      
      const blogsAtStart = await Blog.find({});
      
      const newBlog = {
        title: "Evil Does Not Exist",
        author: "Ryusuke Hamaguchi",
        url: "https://en.wikipedia.org/wiki/Evil_Does_Not_Exist",
      };
      
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/);

      const blogAtEnd = await Blog.find({});
      assert(blogAtEnd.length, blogsAtStart.length)
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
        likes: 10,
      };

      await api.put(`/api/blogs/${id}`).send(updatesLikes).expect(404);
    });
  });
});

describe("users test", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const password = "12345678";

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: "hellas",
      name: "Arto Hellas",
      passwordHash: passwordHash,
    });

    await newUser.save();
  });

  describe("create new user", () => {
    test("create new user 1 - can create user if entries valid", async () => {
      const usersAtStart = await helper.getUsersInDB();

      const newUser = {
        username: "mluukkai",
        name: "Matti Luukkainen",
        password: "salainen",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.getUsersInDB();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      assert(usernames.includes(newUser.username));
    });

    test("create new user 2 - username and password length at least 3, or cannot be created", async () => {
      const usersAtStart = await helper.getUsersInDB();

      const userInvalidUsername = {
        username: "no",
        password: "1344514556366",
      };

      const userInvalidPassword = {
        username: "tobedeleted",
        password: "no",
      };

      const userInvalidBothUsernamePassword = {
        username: "no",
        password: "no",
      };

      await api
        .post("/api/users")
        .send(userInvalidUsername)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      await api
        .post("/api/users")
        .send(userInvalidPassword)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      await api
        .post("/api/users")
        .send(userInvalidBothUsernamePassword)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.getUsersInDB();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });

    test("create new user 3 - user with duplicate user name should not be created", async () => {
      const usersAtStart = await helper.getUsersInDB();

      const newUser = {
        username: "hellas",
        name: "goingtobedeletedanyway",
        password: "1314nfqionpq4",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.getUsersInDB();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length);

      assert(result.body.error.includes("expected `username` to be unique"));
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
