const express = require("express");
const AppError = require("./ErrorHandler/App-Error");
const indexRouter = require("./routers/indexRouter");
const adminRouter = require("./routers/adminRouter");
const GlobalErrorHandler = require("./ErrorHandler/globalErrorHandler");
const app = express();
// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("./static"));
// ROUTERS
app.use("/", indexRouter);
app.use("/admin", adminRouter);
// app.use("/categories", categoryRouter);
// app.use("/news", newsRouter);
// app.use("/users", usersRouter);

app.all("*", (req, res, next) => {
  //   res.status(404).json({
  //     status: "fail",
  //     message: `Can't find ${req.originalUrl} on this server!`,
  //   });

  //   const error = new Error(`Can't find ${req.originalUrl} on this server!`);
  //   error.status = "fail";
  //   error.statusCode = 404;
  //   next(err);

  next(new AppError(`Can't find ${req.originalUrl} on server!`, 404));
});

app.use(GlobalErrorHandler);
module.exports = app;
