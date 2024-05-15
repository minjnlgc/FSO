const blogsRouter = require('express').Router()
const Blog = require('../model/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs);
    }).catch(error => console.error(error));
});

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => console.error(error))
});

module.exports = blogsRouter;