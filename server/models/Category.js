const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
});

module.exports = mongoose.model("Category", CategorySchema);