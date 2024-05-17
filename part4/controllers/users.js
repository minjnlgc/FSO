const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../model/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 3) {
    response
      .status(400)
      .json({ error: "password must be at least 3 characters long" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username: username,
    name: name,
    passwordHash: passwordHash,
  });

  const savedUser = await newUser.save();
  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const returnedUsers = await User.find({});
  response.json(returnedUsers);
});

module.exports = usersRouter;
