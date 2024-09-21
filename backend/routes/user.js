const express = require("express");
const { User, Account } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

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

  await Account.create({
    userId,
    balance: 1 * Math.random() * 10000,
  });

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

// Update the user info..
const updatedBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

// use middleware with the routing...
userRouter.put("/user", authMiddleware, async (req, res) => {
  const { success } = updatedBody.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: "Error while updating the information",
    });
  }

  // getting the userId from the middleware
  await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );
});

// Get the users from backend, filterable via firstName/lastName with query param
userRouter.get("/user/bulk", async (req, res) => {
  const param = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: param,
        },
        lastName: {
          $regex: param,
        },
      },
    ],
  });

  res.status(200).json({
    users,
  });
});

module.exports = userRouter;
