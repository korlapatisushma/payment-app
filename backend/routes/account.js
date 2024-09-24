const { default: mongoose } = require("mongoose");
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
accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  // starting the mongoose session..
  const session = await mongoose.startSession();

  // starting the session...
  session.startTransaction();

  const { amount, to } = req.body;

  // Get the account details of the current user...
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  // check for the sufficient balances...
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient Balance",
    });
  }

  // check the details of sending user...
  const toAccount = await Account.findOne({ userId: to }).session(session);

  // check the to account exist or not...
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Account doesn't exist",
    });
  }

  // Performing the account transfer...
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  // Commit the transactions..
  await session.commitTransaction();

  // send the response message...
  res.json({
    message: "Transfer Successful",
  });
});

module.exports = accountRouter;
