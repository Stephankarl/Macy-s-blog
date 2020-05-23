const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Posts = require('../models/posts');

//Multer config
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});
   
const upload = multer({ storage: storage });

//Create a new Post
router.get('/new', (req, res) => {
    res.render('posts/newPost');
});

//Getting a new post
router.post('/', upload.single('postImage'), (req, res) => {
    const newPost = {
        title: req.body.title,
        category: req.body.category.toLowerCase(),
        content: req.body.content,
        image: req.file.path,
        date: Date.now()
    }
    Posts.create(newPost, (err, newlyCreatedPost) => {
        if (err) throw err;
        res.redirect('/');
    })
});

//Displaying all posts
router.get('/', (req, res) => {
    Posts.find().sort('-date').exec((err, posts) => {
        if (err) throw err;
        res.render('posts/allPosts', { posts: posts });
    });
});

//Displaying Category Route
router.get('/:category', (req, res) => {
    Posts.find({ category: req.params.category }).sort({ _id:-1 }).exec((err, posts) => {
        if (err) throw err;
        res.render('posts/showPosts', { posts: posts });
    });
});

//Individual Post route
router.get('/:category/:id', (req, res) => {
    Posts.findById(req.params.id, (err, post) => {
        if (err) throw err;
        res.render('posts/individualPost', { post: post });
    });
});

module.exports = router;