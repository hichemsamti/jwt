const express = require('express');
const mongoose = require('mongoose');
const authRoutes=require('./routes/authRoutes')
const cookieParser=require('cookie-parser')
const {requireAuth}= require('./middelware/authMiddelware')



const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://hichem:1-hichemmarwa@cluster0.mhzky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => console.log("db connected"))

  
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth, (req, res) => res.render('smoothies'));

app.use(authRoutes)

//cookies
/*app.get('/set-cookies', (req,res)=>{

  res.cookie('newUser', false)
  res.cookie('isEmployee',true,{maxAge:1000*60*60*24,httpOnly:true})

  //res.setHeader('Set-Cookie','newUser=true')

  res.send("you got cookies")

})

app.get('/get-cookies',(req,res)=>{

  const cookies = req.cookies

  console.log(cookies)

  res.json(cookies)


})*/

app.listen(3000,()=>{
  console.log('app now listen')
})