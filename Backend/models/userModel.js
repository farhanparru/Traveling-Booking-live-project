const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true  
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    }

})

// Hash the user's password before saving it to the database

userSchema.pre('save', async function (next){
 // Check if the password has been modified to avoid re-hashing
   
  if(!this.isModified('password')){
      return next()
  }

   try {
    // generate Salt
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt)
    this.password = passwordHash
    next()
    
   } catch (error) {
    next(error)
   }
})

module.exports= mongoose.model("User",userSchema)