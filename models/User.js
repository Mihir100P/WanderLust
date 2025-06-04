const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const localmongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
    email:{
        type:String,
        require:true,
    }
});

UserSchema.plugin(localmongoose); //to generate schema for username and password

module.exports = mongoose.model("User",UserSchema);