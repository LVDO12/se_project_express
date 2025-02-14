const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "67aa8f6c0ad0474d68fc8d6c",
  };
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", require("./routes/users"));
app.use("/items", require("./routes/clothingItems"));

app.use((req, res) => {
  res.status(404).send({ message: "Resource not found" });
});

app.use((err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "An error has occurred on the server." : message,
  });
});

app.listen(PORT);
