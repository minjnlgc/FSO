const blogsRouter = require("express").Router();
const e = require("express");
const Blog = require("../model/blog");
const { error } = require("../utils/logger");

blogsRouter.get("/", async (request, response) => {
  const returnedBlogs = await Blog.find({});
  response.json(returnedBlogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.get("/:id", async (request, response) => {
  const returnedBlog = await Blog.findById(request.params.id);
  response.status(200).json(returnedBlog);
});

module.exports = blogsRouter;
