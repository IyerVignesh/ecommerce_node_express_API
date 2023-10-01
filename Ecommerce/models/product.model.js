import mongoose from "mongoose";
import cat from "./category.model"

const Schema = mongoose.Schema;

const prodschema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    discount_percent : {
        type : Number,
       // required : true
    },
    rating : {
        type : Number
    },
    stock : {
        type : Number,
        required : true
    },
    brand : {
        type:String,
      //  default:'default.png'
    },
    prod_cat_id : {
        type : Schema.Types.ObjectId,
        ref : cat
    },
    thumbnail : {
        type: Array,
        // default:'default.png'
        default : ['default.png']
    },
    created_at : {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("product", prodschema);