const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const joinUserSchema = require('../models/ValidationSchema')

module.exports = {

    // user regisetr
 userSignup: async (req,res)=>{

  try {
    // Destructure and validate the request body
    const { email, name, confirmPassword, password } = req.body;
    const { error } = joinUserSchema.validate({ email, name, password, confirmPassword });

    if (error) {
      console.log('Validation Error:', error.details);
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists with email:', email);
      return res.status(401).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      console.log('Password and confirm password do not match');
      return res.status(400).json({
        success: false,
        message: 'Password and confirm password do not match',
      });
    }

    // Create new user
    const newUser = await User.create({
      email: email,
      name: name,
      password: password,
    });

    const accessToken = jwt.sign(
      { name: newUser.name },
      process.env.USER_ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { name: newUser.name },
      process.env.USER_REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    // Send refreshToken as HTTP-Only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      sameSite: 'Strict',
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      accessToken,
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
    },


    // user Login
    userLogin: async(req,res)=>{
      try{
        const {email, password} = req.body;
    
        const user = await User.findOne({
           email:email,
        })
    
        if(!user){
          return res.status(401).json({
             status:'error',
             message:'User note found'
          })
        }
        
        // verifayi password
    
         const isMatch = await bcrypt.compare(password, user.password)
         if(!isMatch){
          return res.status(401).json({
            status: 'error',
            message: 'Invalid password'
           });
         }
         // generate Access Token
         const accessToken = jwt.sign(
          { name: user.name },
          process.env.USER_ACCESS_TOKEN_SECRET,
          { expiresIn: '15m' }
         );
    
         // generate RefreshToken
         const refreshToken = jwt.sign(
          { name: newUser.name },
          process.env.USER_REFRESH_TOKEN_SECRET,
          { expiresIn: '7d' }
         )
              // Set refresh token as HTTP-Only cookie
           res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
             secure: true, // Set to true if using HTTPS
            sameSite: 'Strict',
            });
    
         return res.status(200).json({
          success:true,
          message:"User logged in successfully",
          accessToken,
         })
         
    
      }catch(error){
        return res.status(500).json({
          success: false,
          message:'server error'
        })
      }
    }

}