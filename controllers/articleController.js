const Article = require("../models/ArticleModal")
const ErrorResponse = require("../utils/errorResponse")


// @desc    Get All articles with params
// @route   GET /api/articles
// @access  Public
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find()
    res.status(200).json({ count: articles.length, data: articles })

  } catch (error) {
    next(new ErrorResponse(`Not Found`, 404))
  }


}

// @desc    Get single Article
// @route   GET /api/articles/:id
// @access  Public
exports.getArticle = async (req, res, next) => {

  try {
    const article = await Article.findById(req.params.id)

    if (!article) {
      return next(new ErrorResponse(`Article not found`, 404))
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
  //add user to body
  req.body.user = req.user.id
  req.body.articleImage = req.file.path

  //create article
  const postArticle = await Article.create(req.body)
  res.status(201).json({ data: postArticle })
}

// @desc    Update article by the user or admin
// @route   POST /api/articles/:id
// @access  Private
exports.editArticle = async (req, res, next) => {
  try {
    //find article by id
    let article = await Article.findById(req.params.id)

    //check if article exists 
    if (!article) {
      return next(new ErrorResponse(`Article not found`, 404))
    }


    //check if user is publisher or the article
    if (article.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`The user ${req.user.id} is not authorised to edit this article`, 403))
    }

    article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    res.status(200).json({ message: article })
  } catch (error) {
    next(new ErrorResponse(`Article not found`, 404))
  }


}

// @desc    Delete article by a user or admin
// @route   POST /api/articles/:id
// @access  Private
exports.deleteArticle = async (req, res, next) => {
  try {

    //find article 
    const article = await Article.findById(req.params.id)

    //check if article exists 
    if (!article) {
      return next(new ErrorResponse(`Article not found`, 404))
    }

    //check if user is publisher or the article
    if (article.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`The user ${req.user.id} is not authorised to delete this article`, 403))
    }

    await article.deleteOne(article._id)
    res.status(200).json({ success: true, data: {} })

  } catch (error) {
    next(new ErrorResponse(`Article not found`, 404))
  }
}

