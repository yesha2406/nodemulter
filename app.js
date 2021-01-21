const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

// Set Storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

// DB Connection Start
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("CONNECTION SUCCESSFUL"))
  .catch((err) => console.log(err));
// DB Connection End

// Init Upload
const upload = multer({
  storage: storage,
}).array("myImage", 5);

// Init app
const app = express();

// EJS
app.set("view engine", "ejs");

// Public folder
app.use(express.static("./public"));

app.post("/fileUpload", upload, function (req, res, next) {
  console.log("*********", req.files);
});

const port = process.env.PORT;

app.listen(port);
