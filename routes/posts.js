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
router.post('/', upload.single('post-image'), (req, res) => {
    const newPost = {
        title: req.body.title,
        category: req.body.category,
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

//LifeStyle Route
router.get('/lifestyle', (req, res) => {
    Posts.find({ category: 'Lifestyle' }).sort({ _id:-1 }).exec((err, posts) => {
        if (err) throw err;
        res.render('posts/showPosts', { posts: posts });
    });
});

//Asia Expat Route
router.get('/asia_expat', (req, res) => {
    Posts.find({ category: 'Asia Expat' }).sort({ _id:-1 }).exec((err, posts) => {
        if (err) throw err;
        res.render('posts/showPosts', { posts: posts });
    });
});

//Travel Route
router.get('/travel', (req, res) => {
    Posts.find({ category: 'Travel' }).sort({ _id:-1 }).exec((err, posts) => {
        if (err) throw err;
        res.render('posts/showPosts', { posts: posts });
    });
});

//Style Route
router.get('/style', (req, res) => {
    Posts.find({ category: 'Style' }).sort({ _id:-1 }).exec((err, posts) => {
        if (err) throw err;
        res.render('posts/showPosts', { posts: posts });
    });
});

module.exports = router;