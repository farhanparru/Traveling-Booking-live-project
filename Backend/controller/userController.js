const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const joinUserSchema = require('../models/ValidationSchema')

module.exports = {

    // user regisetr

 userSignup: async (req,res)=>{
     const {value, error} = joinUserSchema.validate(req.body)
     const {email, name, confirompassword, password} = req.body
       
     const Useremail =  await User.findOne({ email })
      if(Useremail){
        return res.status(401).json({
            success: false,
            message:'User with this email already exists'
        })
      }
     
      if(error){
        return res.status(400).json({
            status:'error',
            message:'Invalid User Input Please Check your data'
        })
      }
       
      try {
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({
                success:false,
                message:"This user Alredy exist this email"
            })
        }
      } catch (error) {
        
      }
    }


}