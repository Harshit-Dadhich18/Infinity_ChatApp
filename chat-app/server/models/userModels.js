const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required :true,
        min:3,
        max:20,
        unique: true
    },
    email:{
        type: String,
        required :true,
        max:50,
        unique: true
    },
    password: {
        type: String,
        required :true,
        min:6
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    isAvatarImage:{
        type:String,
        default: "",
    }
})

module.exports = mongoose.model("Users.Chat-app",userSchema);