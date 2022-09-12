const { extname } = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./static/uploader",
  filename: (req, file, cb) => {
    const filename = Date.now().toString() + extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({ storage });
module.exports = upload;
