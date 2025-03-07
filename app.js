const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { PORT = 3001 } = process.env;

const app = express();

const { NOT_FOUND, DEFAULT } = require("./utils/status");
const User = require("./models/user");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db", { autoIndex: true })
  .then(() => User.init());

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/index"));

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Resource not found" });
});

app.use((err, req, res, next) => {
  const { statusCode = DEFAULT, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === DEFAULT ? "An error has occurred on the server." : message,
  });
  next();
});

app.listen(PORT);
