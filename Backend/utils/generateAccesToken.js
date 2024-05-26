const jwt = require('jsonwebtoken');
const UserToken = require('../models/UserToken');


const generateToken = async (user) =>{
    try {

        const payload = {_id: user._id,roles: user.roles}
        const accessToken = jwt.sign(
            payload,
            process.env.USER_ACCESS_TOKEN_SECRET,
            {expiresIn: '14m'}
        );

        const refreshToken= jwt.sign(
            payload,
            process.env.USER_REFRESH_TOKEN_SECRET,
            {expiresIn:'30d'}
        )

        const userToken = await UserToken.findOne({ userId: user._id });
        if (userToken) await userToken.remove();

        await new UserToken({ userId: user._id, token: refreshToken }).save();  
        return Promise.resolve({ accessToken, refreshToken})
          
    } catch (error) {
        return Promise.reject(error)
        
    }
}

module.exports = generateToken;