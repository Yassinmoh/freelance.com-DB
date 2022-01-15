const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrype = require("bcrypt");

router.post("/newpost", async (req, res) => {
  const newPost = await new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      const deletePost = await Post.findByIdAndDelete(req.params.id);
      res.status(200).json(deletePost);
    } else {
      res.status(401).json("Sorry You Can Only Remove Your Posts");
    }
  } catch (error) {}
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can UserName Is Not Match");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// Get One POST
router.get("/:id", async (req, res) => {
  try {
    const getPost = await Post.findById(req.params.id);
    res.status(200).json(getPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All POST
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cateory;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
    const getPost = await Post.find();
    res.status(200).json(getPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
