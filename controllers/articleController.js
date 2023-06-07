const Article = require("../models/ArticleModal")
const ErrorResponse = require("../utils/errorResponse")


// @desc    Get All articles with params
// @route   GET /api/articles
// @access  Public
exports.getArticles = async (req, res) => {

  const articles = await Article.find()

  if (!articles) {
    res.status(404).json({ message: "Article not found" })
  }

  res.status(200).json({ count: articles.length, data: articles })

}

// @desc    Get single Article
// @route   GET /api/articles/:id
// @access  Public
exports.getArticle = async (req, res, next) => {

  try {
    const article = await Article.findById(req.params.id)
    if (!article) {
      return res.status(400).json({ message: "Article not found" })
    }
    res.status(200).json({ data: article })
  } catch (error) {
    next(new ErrorResponse(`Article not found with id of ${req.params.id}`, 404))
  }
}

// @desc    Post an article
// @route   POST /api/articles/
// @access  Private
exports.postArticle = async (req, res) => {

  if (!req.body) {
    return res.status(400).json({ message: "Please fill all fields" })
  }

  const postArticle = await Article.create({
    title: req.body.title,
    team: req.body.team,
    league: req.body.league,
    article: req.body.article
  })
  res.status(201).json({ data: postArticle })
}

// @desc    Update article by the user or admin
// @route   POST /api/articles/:id
// @access  Private
exports.editArticle = async (req, res) => {
  //find article by id
  const article = await Article.findById(req.params.id)

  //check if article exists 
  if (!article) {
    res.status(400).json({ message: "Article not found" })
  }

  const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json({ message: updatedArticle })

}

// @desc    Delete article by a user or admin
// @route   POST /api/articles/:id
// @access  Private
exports.deleteArticle = async (req, res) => {
  //find article 
  const article = await Article.findById(req.params.id)

  //check if article exists 
  if (!article) {
    res.status(400).json('Article not found')
  }

  await Article.findByIdAndDelete(article)
  res.status(200).json({ id: req.params.id })

}

