
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

//set up express app
const app = express()

const mongourl = require('./config/key')

//connect to mongoDB
mongoose.connect("mongodb+srv://Shivam11:Shivam11@@cluster0-rmlbh.mongodb.net/test", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
mongoose.Promise = global.Promise


app.use(cors());


app.use(express.static('public'))

//middleware
app.use(bodyParser.json())

// initialize routes
app.use('/api', require('./routes/api'))

//error middleware

const Port = process.env.PORT || 1000
//listen for req
app.listen(Port, ()=>{
  console.log(`now listening to port ${Port}`);
})
