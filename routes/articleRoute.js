const express = require("express");
const {
  getArticles,
  getArticle,
  postArticle,
  editArticle,
  deleteArticle } = require("../controllers/articleController");
const router = express.Router();
const { protect, authorise } = require('../middleware/auth')

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", getArticles);

router.get("/:id", getArticle);

router.post("/", upload.single("articleImage"), protect, authorise('publisher', 'admin'), postArticle);

router.put("/:id", protect, authorise('publisher', 'admin'), editArticle);

router.delete("/:id", protect, authorise('publisher', 'admin'), deleteArticle);


module.exports = router;