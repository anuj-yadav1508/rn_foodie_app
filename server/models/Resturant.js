const mongoose = require('mongoose');

const ResturantSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: String,
    },
    ratings: {
        type: Number,
    },
    ratingsCount: {
        type: Number,
    },
    imageUrl: {
        type: String,
    },
    timeToCook: {
        type: String,
    },
    categories: {
        type: Array,
    },
    offer: {
        type: Number,
    },
    deliveryStatus: {
        type: Array,
    }
});

module.exports = mongoose.model('Resturant', ResturantSchema);