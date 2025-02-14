const User = require("../models/user");
const {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("../utils/errors");

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(new InternalServerError(err.message)));
};

module.exports.createUser = (req, res, next) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid Name."));
      } else {
        next(new InternalServerError(err.message));
      }
    });
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => new NotFoundError("User not found."))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID."));
      } else if (err instanceof NotFoundError) {
        next(err);
      } else {
        next(new InternalServerError(err.message));
      }
    });
};
