const User = require('../models/userModel')
const generateToken = require('../utils/generateAccesToken')
const joinUserSchema = require('../models/ValidationSchema')


module.exports = {

    // user regisetr
    userSignup: async (req, res) => {
      try {
        // Destructure and validate the request body
        const { email, name,password,confirmPassword } = req.body;
        const { error } = joinUserSchema.validate({ email, name, password, confirmPassword });
    
        if (error) {
          return res.status(400).json({
            status: 'error',    
            message: error.details[0].message,
          });
        }
    
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(401).json({
            success: false,
            message: 'User with this email already exists',
          });
        }
    
        // Check if password and confirm password match
        if (password !== confirmPassword) {
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
    
        // Generate AccessToken and refreshToken
        const { accessToken, refreshToken } = await generateToken(newUser);
    
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
        console.error('Error during user signup:', error); // Log the error details
    
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
      
        const {error,value} = joinUserSchema.validate({email, password})
         console.log(error.name);
        if(error){
          return res
          .status(400)
          .json({error:true, message: error.details[0].message})
        }
    
        const user = await User.findOne({
           email:req.body.email
        })
    
        if(!user){
          return res.status(401).json({
             status:'error',
             message:'Invalid email or paswword'
          })
        }
        
        // verifayi password
    
         const isMatch = await bcrypt.compare(
          req.body.password, 
          user.password
        )
         if(!isMatch){
          return res.status(401).json({
            status: 'error',
            message: 'Invalid password'
           });
         }
     
           const {accessToken , refreshToken} = await generateToken(user)

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
        console.log(error);
        return res.status(500).json({
          success: false,
          message:'server error'
        })
      }
    }

}