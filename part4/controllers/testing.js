const testRouter = require('express').Router()
const User = require('../model/user')
const Blog = require('../model/blog')

testRouter.post('/reset', async (request, response) => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    response.status(204).end();
});

module.exports = testRouter;