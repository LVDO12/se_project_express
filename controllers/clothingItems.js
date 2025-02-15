const ClothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("../utils/errors");

module.exports.getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => next(new InternalServerError(err.message)));
};

module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((clothingItem) => res.send({ date: clothingItem }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid Data."));
      } else {
        next(new InternalServerError(err.message));
      }
    });
};

module.exports.deleteItemById = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => new NotFoundError("Item not found"))
    .then((clothingItem) => res.send({ data: clothingItem }))
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

module.exports.likeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item not found."))
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID."));
      } else if (err instanceof NotFoundError) {
        next(err);
      } else {
        next(new InternalServerError(err.message));
      }
    });

module.exports.disLikeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item not found."))
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID."));
      } else if (err instanceof NotFoundError) {
        next(err);
      } else {
        next(new InternalServerError(err.message));
      }
    });
