const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const app = express();

const{NOT_FOUND, DEFAULT} = require('./utils/status');

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "67aa8f6c0ad0474d68fc8d6c",
  };
  next();
});

app.use("/users", require("./routes/users"));
app.use("/items", require("./routes/clothingItems"));

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Resource not found" });
});

app.use((err, req, res, next) => {
  const { statusCode = DEFAULT, message } = err;
  res.status(statusCode).send({
    message: statusCode === DEFAULT ? "An error has occurred on the server." : message,
  });
  next();
});


app.listen(PORT);
