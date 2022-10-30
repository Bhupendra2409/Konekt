const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:500
    },
    photo:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    },
    comment:{
        type:Array,
        default:[]
    },
    date:{
        type:Date
    },
},
{timestamps:true}
)

module.exports = mongoose.model('Posts',PostSchema);