const UserToken = require('../models/UserToken');
const jwt = require('jsonwebtoken');

const verifyRefreshToken = (refreshToken) => {
    const privateKey = process.env.USER_REFRESH_TOKEN_SECRET;

    return new Promise((resolve, reject) => {
        UserToken.findOne({ token: refreshToken }, (err, doc) => {
            if (err) {
                return reject({ error: true, message: "Database error" });
            }

            if (!doc) {
                return reject({ error: true, message: "Invalid refresh token" });
            }

            jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
                if (err) {
                    return reject({ error: true, message: "Invalid refresh token" });
                }

                resolve({
                    tokenDetails,
                    error:false,
                    message:"Valid refresh token"
                    
                });
            });
        });
    });
};

module.exports = verifyRefreshToken;
