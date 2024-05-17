const blogsRouter = require("express").Router();
const Blog = require("../model/blog");

blogsRouter.get("/", async (request, response) => {
  const returnedBlogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
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

blogsRouter.delete("/:id", async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id);
  response.status(200).json(deletedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
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
