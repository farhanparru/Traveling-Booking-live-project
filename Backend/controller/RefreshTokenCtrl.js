const UserToken = require ('../models/UserToken.js')
const jwt = require('jsonwebtoken')
const verifyRefreshToken = require('../utils/verifayiRefreshToken.js')



module.exports ={
    refreshToken: async(req,res)=>{
     const {error} = verifyRefreshToken(req.body)
     if(error)
        return res 
       .status(400)
       .json({error:true, message: error.details[0].message})

       verifyRefreshToken(req.body.refreshToken)
       .then(({tokenDetails})=>{
           const payload = {_id: tokenDetails._id, roles: tokenDetails.roles}
           const accessToken= jwt.sign(
            payload,
            process.env.USER_ACCESS_TOKEN_SECRET,
            {expiresIn:'14m'}
           )

           res.status(200).json({
            error:false,
            accessToken,
            message:"Access Token created successfully"
           })
       })
       .catch((err) => res.status(400).json(err))
        
    },


    logout:async(req,res)=>{
        try {
            res.clearCookie('refreshToken',{
                httpOnly:true,
                secure:true,
                sameSite:'strict'
            })

            return res.status(200).json({
                success:true,
                message:"User logged out successfully"
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Server Error"
            })
        }
    }


}