const jwt = require('jsonwebtoken');

// verifying token only
const verifyToken = (req, res, next) => {
    const authHeaders = req.headers;

    if( authHeaders && authHeaders !== undefined ) {
        const token = authHeaders.authorization.split(' ')[1];

        if( token ) {
            jwt.verify( token, process.env.JWT_SECRET_KEY, (err, user) => {
                if ( err ) return res.status(400).json('Invalid token !');

                req.user = user;

                next();
            });
        } else {
            return res.status(402).json('Token is not provided !');
        }
    } else {
        return res.status(401).json('Headers are not provided !');
    }
};

// verifying token and authorization
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if( req.params.userId === req.user.userId || req.user.isAdmin ) {
            next();
        } else {
            return res.status(400).json('You are not authorized to complete this action !');
        }
    }); 
};

// verifying token and admin only
const verifyTokenAndAdmin = ( req, res, next ) => {
    verifyToken(req, res, () => {
        if( req.user.isAdmin ) {
            next();
        } else {
            return res.status(400).json('You are not authorized to complete this action !');
        }
    });    
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };