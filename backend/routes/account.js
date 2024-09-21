const express = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");

const accountRouter = express.Router();

// End point to get the balance of an User...
accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const { balance } = await Account.findOne({
    userId: req.userId,
  });
  res.status(200).json({
    balance,
  });
});

// End point to transfer money from one account to another account...
accountRouter.post("/transfer", async (req, res) => {});

module.exports = accountRouter;
