class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class InternalServerError extends Error {
  constructor(message = "An error has occurred on the sever.") {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  InternalServerError,
};
