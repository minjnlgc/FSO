const { test, describe } = require("node:test");
const assert = require("node:assert");
const listhelper = require("../utils/list_helper");

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  },
];

const listWithManyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listhelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listhelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("when list has many blogs, equals sum of all blogs", () => {
    const result = listhelper.totalLikes(listWithManyBlogs);
    assert.strictEqual(result, 36);
  });

  test("when list is empty, return 0", () => {
    const result = listhelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });
});

describe("most likes blog", () => {
  test("when list has only one blog, return the only one blog", () => {
    const result = listhelper.favorateBlog(listWithOneBlog);
    assert.deepStrictEqual(result, listWithOneBlog[0]);
  });

  test("when list has many blogs, return the one with most likes", () => {
    const result = listhelper.favorateBlog(listWithManyBlogs);
    assert.deepStrictEqual(result, listWithManyBlogs[2]);
  });

  test("when list is empty, return empty object", () => {
    const result = listhelper.favorateBlog([]);
    assert.deepStrictEqual(result, {});
  });
});

describe("most blogs author", () => {
  test("when list has only one blog, return the only one author and their blog count", () => {
    const result = listhelper.mostBlogs(listWithOneBlog);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", blogs: 1 });
  });

  test("when list has many blogs, return the author and their blog count with most blogs", () => {
    const result = listhelper.mostBlogs(listWithManyBlogs);
    assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 });
  });

  test("when list is empty, return empty object", () => {
    const result = listhelper.mostBlogs([]);
    assert.deepStrictEqual(result, {});
  });
});

describe("most accumulated likes author", () => {
  test("when list has only one blog, return the only one author and their likes count", () => {
    const result = listhelper.mostLikes(listWithOneBlog);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 5 });
  });

  test("when list has many blogs, return the author and their likes count with most likes", () => {
    const result = listhelper.mostLikes(listWithManyBlogs);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 17 });
  });

  test("when list is empty, return empty object", () => {
    const result = listhelper.mostLikes([]);
    assert.deepStrictEqual(result, {});
  });
});
