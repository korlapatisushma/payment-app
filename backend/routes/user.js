const express = require("express");
const { User } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const userRouter = express.Router();

// Signup router
const signupBody = zod.object({
  username: zod.string().email(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string(),
});

userRouter.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);

  //   Check Zod validation is success or not..
  if (!success) {
    return res.status(411).json({
      message: "Email is already registered/Incorrect Inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  //   Check if the user is already exist in DB...
  if (existingUser) {
    return res.status(411).json({
      message: "Email is already taken",
    });
  }

  // create a user object to store in DB...
  const user = await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  });

  //   Get the user ID...
  const userID = user._id;

  const token = jwt.sign(
    {
      userID,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created Successfully",
    token: token,
  });
});

// Signin route
const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

userRouter.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  // check the zod validation...
  if (!success) {
    res.status(411).json({
      message: "Error while logging in",
    });
  }

  // Get the user from the username and password...
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  // If user doesn't exist
  if (!user) {
    res.status(411).json({
      message: "Error while logging in!",
    });
  }

  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.status(200).json({
    token,
  });
});

module.exports = userRouter;
