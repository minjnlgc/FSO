const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../model/user");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  // get the user from database by username
  const returnedUser = await User.findOne({ username });

  // compare the password with bcrypt
  try {
    await bcrypt.compare(password, returnedUser.passwordHash);
  } catch (error) {
    console.log("error:", error);
  }

  const isPasswordCorrect = returnedUser === null ? false : true;

  if (!isPasswordCorrect || !returnedUser) {
    response.status(401).json({ error: "invalid username or password" });
  }

  //  generate the jwt tokens
  const userForToken = {
    username: returnedUser.username,
    id: returnedUser.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  // return the response with appropriate status code and content
  response
    .status(200)
    .json({ token, username: returnedUser.username, name: returnedUser.name });
});

module.exports = loginRouter;
