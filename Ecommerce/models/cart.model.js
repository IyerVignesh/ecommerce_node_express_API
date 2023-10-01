import mongoose from "mongoose";
import productModel from "./product.model";
import userModel from "./user.model";

const Schema = mongoose.Schema;

const cartschema = new Schema({
    prod_id : {
        type : Schema.Types.ObjectId,
        ref : productModel
    },
    prod_title : {
        type : String,
        required : true
    },
    prod_img : {
        type:String,
        default:'default.png'
    },
    prod_qty : {
        type : Number,
        required : true
    },
    prod_price : {
        type : String,
        required : true
    },
    usr_id : {
        type : Schema.Types.ObjectId,
        ref : userModel
    },
    created_at : {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("cart", cartschema);