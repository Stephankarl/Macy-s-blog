const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    name: String,
    category: String,
    link: String,
})

module.exports = mongoose.model('Shop', ShopSchema);