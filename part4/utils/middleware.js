const morgan = require("morgan");
const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

morgan.token("content", (request, require) => {
  if (!request.body) {
    return;
  }
  return JSON.stringify(request.body);
});

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .send({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.includes("Bearer")) {
    request.token = authorization.replace("Bearer ", "");
  } else {
    request.token = null;
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    request.user = null;
  } else {
    request.user = await User.findById(decodedToken.id);
  }
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  morgan,
  tokenExtractor,
  userExtractor,
};
