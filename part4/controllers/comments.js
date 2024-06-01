const commentsRouter = require("express").Router();
const Blog = require("../model/blog");
const Comment = require("../model/comment");

commentsRouter.get("/:id/comment", async (request, response) => {
  const returnedBlog = await Blog.findById(request.params.id).populate(
    "comments");

  response.status(200).json(returnedBlog.comments);
});

commentsRouter.post("/:id/comment", async (request, response) => {
  const returnedBlog = await Blog.findById(request.params.id);
  const commentInfo = {
    ...request.body,
    blog: returnedBlog._id,
  };

  const newComment = new Comment(commentInfo);
  const savedComment = await newComment.save();

  returnedBlog.comments = returnedBlog.comments.concat(savedComment._id);
  await returnedBlog.save();

  response.status(201).json(savedComment);
});

module.exports = commentsRouter;
