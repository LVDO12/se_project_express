const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./middlewares/auth");

const { PORT = 3001 } = process.env;

const app = express();

const{NOT_FOUND, DEFAULT} = require('./utils/status');

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/index"));

app.post("/signin", require("./controllers/users").loginUser);
app.post("/signup", require("./controllers/users").createUser);
app.get("/items", require("./controllers/clothingItems").getItems);

app.use(auth);
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
