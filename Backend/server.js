require('dotenv').config();
const  express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const userRouter = require('./router/userRoute')

const PORT = 4000;


// databse connections
mongoose.connect("mongodb+srv://TravelApp:TR12345@cluster0.saqdms1.mongodb.net/Travel?retryWrites=true&w=majority", {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to MongoDb');
}).catch((err)=>{   
    console.log('Error connceting to MongoDb:',err.message);
})

//Parse json

// Rate limiting middleware 
const loginlimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // Limit each IP to 5 login requests per windowMs
    message: "Too many login attempts from this IP, please try again after 15 minutes"
})



app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(cookieParser())
app.use(loginlimiter)
app.use(bodyParser.urlencoded({ extended: true }));


// API

app.use('/api/users',userRouter)



app.get('/',(req,res)=>{
    res.send('Hello Backend')
})

  

app.listen(PORT,()=>{
    console.log('Server is Runing port on 4000');
})