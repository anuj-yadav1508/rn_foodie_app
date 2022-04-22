const express = require('express');
const User = require('../models/User');
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const router = express.Router();

// register with jwt
router.post('/register', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if(user) {
            return res.status(401).json('User already exits, Try another email');
        } else {
            
            const hasedPassword = crypto.AES.encrypt(req.body.password, process.env.CRYPTO_SECRET_KEY);
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: hasedPassword,
            });
            const savedUser = await newUser.save();
            const { password, ...others } = savedUser._doc;
            return res.status(200).json(others);
        }
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// login with jwt
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if(user) {
            const originalPassword = crypto.AES.decrypt(user.password, process.env.CRYPTO_SECRET_KEY).toString(crypto.enc.Utf8);
            
            if(req.body.password === originalPassword) {
                const token = await jwt.sign({ userId: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY);

                return res.status(200).json({accessToken: token, ...user._doc});
                
            } else {
                return res.status(402).json('Password incorrect!');
            }
        } else {
            return res.status(401).json('User not found, Register yourself first!');
        }
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

module.exports = router;