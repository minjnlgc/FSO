const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");

const app = express();

logger.info(`connecting to ${process.env.MONGODB_URI}`);
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB: ", error.message);
  });

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  app.use(
    middleware.morgan(
      ":method :url :status :res[content-length] - :response-time ms :content"
    )
  );
}

app.use(middleware.tokenExtractor);

app.use("/api/users", usersRouter);
app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
