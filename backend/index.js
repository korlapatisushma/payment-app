const express = require("express");
const rootRouter = require("./routes");
const userRouter = require("./routes/user");
const accountRouter = require("./routes/account");

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.listen(3000, (err) => {
  if (err) {
    console.log(err, "Error in the console!");
  } else {
    console.log("Listening to the port number 3000!");
  }
});
