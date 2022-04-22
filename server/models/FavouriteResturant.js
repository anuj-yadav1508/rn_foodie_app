const mongoose = require('mongoose');

const FavouriteResturantSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    favouriteResturants: {
        type: Array,
        default: []
    },
},
    { timestamps: true },
);

module.exports = mongoose.model("FavouriteResturant", FavouriteResturantSchema);