const dotenv = require("dotenv");
dotenv.config;
const app = require("./app");
const db = require("./core/config/db");
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV;

const start = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully");
    await db.sync();
    app.listen(PORT, () => {
      console.log(`Server ${NODE_ENV} started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
