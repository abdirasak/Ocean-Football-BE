

// @desc    Get All articles with params
// @route   GET /api/articles
// @access  Public
exports.getArticles = async (req, res) => {
  try {
    res.status(200).json({ message: 'List of Articles' })
  } catch (error) {
    console.log(error);
  }
}

// @desc    Get single Article
// @route   GET /api/articles/:id
// @access  Public
exports.getArticle = async (req, res) => {
  try {
    res.status(200).json({ message: `Article number ${req.params.id}` })
  } catch (error) {
    console.log(error);
  }
}

// @desc    Post an article
// @route   POST /api/articles/
// @access  Private
exports.postArticle = async (req, res) => {
  try {
    res.status(200).json({ message: `Post an article` })
  } catch (error) {
    console.log(error);
  }
}

// @desc    Update article by the user or admin
// @route   POST /api/articles/:id
// @access  Private
exports.editArticle = async (req, res) => {
  try {
    res.status(200).json({ message: `Edit article number ${req.params.id}` })
  } catch (error) {
    console.log(error);
  }
}

// @desc    Delete article by a user or admin
// @route   POST /api/articles/:id
// @access  Private
exports.deleteArticle = async (req, res) => {
  try {
    res.status(200).json({ message: `Delete article number ${req.params.id}` })
  } catch (error) {
    console.log(error);
  }
}

