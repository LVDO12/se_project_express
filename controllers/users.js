const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
  UnauthorizedError,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const handleUserError = (err, next) => {
  if (err.name === "ValidationError") {
    return next(new BadRequestError("Invalid data."));
  }
  if (err.name === "CastError") {
    return next(new BadRequestError("Invalid ID."));
  }
  if (err.code === 11000) {
    return next(new ConflictError("Email already exists."));
  }
  if (err instanceof NotFoundError || err instanceof UnauthorizedError) {
    return next(err);
  }

  return next(err);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash, avatar }))
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(201).send({ data: userWithoutPassword });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data."));
      }

      return handleUserError(err, next);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => new NotFoundError("User not found."))
    .then((user) => res.send({ data: user }))
    .catch((err) => handleUserError(err, next));
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required."));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err instanceof UnauthorizedError) {
        return next(new UnauthorizedError("Incorrect email or password."));
      }
      return next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("User not found."))
    .then((user) => res.send({ data: user }))
    .catch((err) => handleUserError(err, next));
};
