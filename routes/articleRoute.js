const express = require("express");
const {
  getArticles,
  getArticle,
  postArticle,
  editArticle,
  deleteArticle } = require("../controllers/articleController");
const router = express.Router();
const { protect } = require('../middleware/auth')

router.get("/", getArticles);

router.get("/:id", getArticle);

router.post("/", protect, postArticle);

router.put("/:id", protect, editArticle);

router.delete("/:id", protect, deleteArticle);


module.exports = router;