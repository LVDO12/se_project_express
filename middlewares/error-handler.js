const { DEFAULT } = require("../utils/status");

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || DEFAULT;
  const message =
    statusCode === DEFAULT ? "An error has occurred on the server." : err.message;

  console.error(err);

  return res.status(statusCode).send({
    message,
  });
};

