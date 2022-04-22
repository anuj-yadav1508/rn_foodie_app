const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    imageUrl: {
        type: String,
    },
    description: {
        type: String,
    },
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);