class InternalServerError extends Error {
  constructor(message = "An error has occurred on the sever.") {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = InternalServerError;