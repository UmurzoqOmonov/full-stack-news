const dotenv = require("dotenv");
dotenv.config;

const sendErrorDev = (err, res) => {
  const errorInfo = {
    status: err.status,
    statusCode: err.statusCode,
    error: err,
    message: err.message,
    stack: err.stack,
  };

  res.render("modal/modal", { errorInfo });
};

const sendErrorProd = (err, res) => {
  const errorInfo = {
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
  };

  res.render("modal/modal", { errorInfo });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  const NODE_ENV = dotenv.NODE_ENV;

  if (NODE_ENV === "PROD") {
    sendErrorProd(err, res);
  } else if (NODE_ENV === "DEV") {
    sendErrorDev(err, res);
  }
};
