require('dotenv').config({ path: './config/config.env' });
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const connectDb = require('./config/db');

// connecting to db
connectDb();

// body parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middlewares
app.use(morgan('common'));
app.use(helmet());
app.use(cors());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resturants', require('./routes/resturants'));
app.use('/api/resturants/checkout', require('./routes/payment'));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));