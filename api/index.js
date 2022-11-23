const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const {ServerApiVersion} = require('mongodb');

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
dotenv.config();
 



//middleware

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods','PUT, POST, GET, DELETE, OPTIONS');
    next();
  });


app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)


mongoose.connect(process.env.MONGO_URL,{useUnifiedTopology: true, serverApi: ServerApiVersion.v1, dbName: 'konekt',useNewUrlParser: true})
.then(()=>{
    app.listen(8000,()=>{
        console.log("server running");
    })
}).catch((err)=>console.log(err) );


