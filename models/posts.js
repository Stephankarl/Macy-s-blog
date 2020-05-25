const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    category: String,
    content: String,
    image: String,
    continents: String,
    country: String,
    date: Date
});

module.exports = mongoose.model('Post', PostSchema);