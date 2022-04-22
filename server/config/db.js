require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Mongo connected to: ${conn.connection.host}`)
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDb;