const jwt = require('jsonwebtoken')
const userSchema = require('../models/userModel')


const userAuth = async(req,res,next) =>{
  try {
    // get token fro header
    const token = req.header("Authorization")
   
    // check if not a token

    if(!token){
        return res.status(400).json({msg:'Invalid Authentication'})
    }
     // verifyi token
    const decoded =  jwt.verify(token, process.env.USER_ACCES_TOKEN_SECRET)
    if(!decoded){
        return res.status(401).json({msg:"Unauthorized:Invalid Token"})
    }

    const user = await userSchema.findById({_id:decoded.id})
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized: User not found" });
  }
  req.user = user;
  next();

  } catch (error) {
    
  }
}

module.exports = userAuth