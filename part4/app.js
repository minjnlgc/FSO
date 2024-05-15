const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')

const app = express()

logger.info(`connecting to ${process.env.MONGODB_URI}`);
mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.morgan(":method :url :status :res[content-length] - :response-time ms :content"))

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)

module.exports = app;