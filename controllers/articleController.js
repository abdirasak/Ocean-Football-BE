const Article = require("../models/ArticleModal")

// @desc    Get All articles with params
// @route   GET /api/articles
// @access  Public
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find()
    res.status(200).json({ count: articles.length, data: articles })
  } catch (error) {
    console.log(error);
  }
}

// @desc    Get single Article
// @route   GET /api/articles/:id
// @access  Public
exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    res.status(200).json({ data: article })
  } catch (error) {
    console.log(error);
  }
}

// @desc    Post an article
// @route   POST /api/articles/
// @access  Private
exports.postArticle = async (req, res) => {
  try {

    if (!req.body) {
      res.status(400)
      console.log('please complete all fields')
    }

    const postArticle = await Article.create({
      title: req.body.title,
      team: req.body.team,
      league: req.body.league,
      article: req.body.article
    })
    res.status(201).json({ data: postArticle })
  } catch (error) {
    console.log(error);
  }
}

// @desc    Update article by the user or admin
// @route   POST /api/articles/:id
// @access  Private
exports.editArticle = async (req, res) => {
  try {
    //find article by id
    const article = await Article.findById(req.params.id)

    //check if article exists 
    if (!article) {
      res.status(400)
      console.log("Article not found");
    }

    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json({ message: updatedArticle })
  } catch (error) {
    console.log(error);
  }
}

// @desc    Delete article by a user or admin
// @route   POST /api/articles/:id
// @access  Private
exports.deleteArticle = async (req, res) => {
  try {
    //find article 
    const article = await Article.findById(req.params.id)

    //check if article exists 
    if (!article) {
      res.status(400)
      throw new Error('Article not found')
    }

    await Article.findByIdAndDelete(article)
    res.status(200).json({ id: req.params.id })
  } catch (error) {
    console.log(error);
  }
}

