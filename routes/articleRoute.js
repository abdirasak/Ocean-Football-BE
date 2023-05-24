const express = require("express");
const {
  getArticles,
  getArticle,
  postArticle,
  editArticle,
  deleteArticle } = require("../middleware/articleController");
const router = express.Router();

router.get("/", getArticles);

router.get("/:id", getArticle);

router.post("/", postArticle);

router.put("/:id", editArticle);

router.delete("/:id", deleteArticle);


module.exports = router;