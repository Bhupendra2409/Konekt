const express = require('express');
const app = express();
// const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require(cors);
const morgan = require('morgan');
// const path = require('path')
const {ServerApiVersion} = require('mongodb');

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
dotenv.config();
 



//middleware
app.use(cors())
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// app.use(expressCspHeader({
//     directives: {
//         'default-src': [SELF],
//         'script-src': [SELF, INLINE, 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js','https://apis.google.com'],
//         'style-src': [SELF, 'http://localhost:3000/assets/style.css'],
//         'img-src': ['data:', 'images.com'],
//         'worker-src': [NONE],
//         'block-all-mixed-content': false
//     }
// }));

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods','PUT, POST, GET, DELETE, OPTIONS');
    next();
  });


app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)


// app.use(express.static(path.join(__dirname+"/public")))

mongoose.connect(process.env.MONGO_URL,{useUnifiedTopology: true, serverApi: ServerApiVersion.v1, dbName: 'konekt',useNewUrlParser: true})
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log("server running");
    })
}).catch((err)=>console.log(err) );


