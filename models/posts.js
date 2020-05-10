const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    category: String,
    content: String,
    image: String,
    date: Date
});

module.exports = mongoose.model('Post', PostSchema);