const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    resturantName: {
        type: String,
    },
    itemsOrdered: {
        type: Array,
    },
    address: {
        type: String,
    },
    orderTotal: {
        type: Number,
    },
    status: {
        type: String,
        default: 'pending',
    },
},
    { timestamps: true },
);

module.exports = mongoose.model("Order", OrderSchema);