const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send('Article List')
});

router.get("/:id", (req, res) => {
  res.status(200).send(`Article ${req.params.id}`)
});

router.post("/", (req, res) => {
  res.status(201).send('Post Article')
});

router.put("/:id", (req, res) => {
  res.status(200).send(`Edit Article number ${req.params.id}`)
});

router.delete("/:id", (req, res) => {
  res.status(200).send(`Delete Article number ${req.params.id}`)
});


module.exports = router;