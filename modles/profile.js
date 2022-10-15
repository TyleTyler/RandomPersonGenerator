const images = require('images');
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name : {
        type : String,
        Required : true
    },
    age : {
        type: String,
        Required : true
    },
    location : { 
        type: String,
        Required : true,
    },
    favoriteColor: {
        type: String,
        Required:  true
    },
    favoriteGenre: {
        type : String,
        Required : true
    },
    picture : {
        type : String,
        Required : true
    }
}, { timestamps : true})

const Profile = mongoose.model("profile", profileSchema)

module.exports = Profile;
