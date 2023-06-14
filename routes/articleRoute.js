const express = require("express");
const {
  getArticles,
  getArticle,
  postArticle,
  editArticle,
  deleteArticle } = require("../controllers/articleController");
const router = express.Router();
const { protect, authorise } = require('../middleware/auth')

router.get("/", getArticles);

router.get("/:id", getArticle);

router.post("/", protect, authorise('publisher', 'admin'), postArticle);

router.put("/:id", protect, authorise('publisher', 'admin'), editArticle);

router.delete("/:id", protect, authorise('publisher', 'admin'), deleteArticle);


module.exports = router;