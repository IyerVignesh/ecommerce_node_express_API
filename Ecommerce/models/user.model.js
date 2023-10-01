import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usrschema = new Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    birth_date : {
        type : String,
        required : true
    },
    usr_img : {
        type:String,
        default:'default.png'
    },
    created_at : {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("user", usrschema);