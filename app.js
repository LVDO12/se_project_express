const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./middlewares/auth");

const { PORT = 3001 } = process.env;

const app = express();

const { NOT_FOUND, DEFAULT } = require("./utils/status");
const{UnauthorizedError} = require('./utils/errors');
const User = require("./models/user");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", { autoIndex: true })
.then(()=> User.init());

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/index"));

app.use(auth);
app.use("/users", require("./routes/users"));
app.use("/items", require("./routes/clothingItems"));

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Resource not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = DEFAULT, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === DEFAULT ? "An error has occurred on the server." : message,
  });
});

app.listen(PORT);
