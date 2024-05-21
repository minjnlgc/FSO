const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../model/blog");
const User = require("../model/user");

blogsRouter.get("/", async (request, response) => {
  const returnedBlogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(returnedBlogs);
});

blogsRouter.post("/", async (request, response) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "token invalid" });
  }

  const newBlogInfo = {
    ...request.body,
    user: user._id,
  };

  const newBlog = new Blog(newBlogInfo);
  const savedBlog = await newBlog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.get("/:id", async (request, response) => {
  const returnedBlog = await Blog.findById(request.params.id);
  response.status(200).json(returnedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;

  if (!user) {
    response.status(401).json({ error: "token invalid" });
  }

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    response.status(404).json({ error: "invalid id" });
  }

  if (blog.user.toString() === user._id.toString()) {
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id);
    response.status(200).json(deletedBlog);
  } else {
    response.status(401).json({ error: "unauthorised action" });
  }
});

blogsRouter.put("/:id", async (request, response) => {

  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const updates = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (updatedBlog) {
    response.status(200).json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
