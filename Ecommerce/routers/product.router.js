import express from "express";
import bodyParser from "body-parser";
import {addProd, getAllProd, getSingleProd, updateProd, deltthumb, deletProd} from "../controllers/product.controller"
import { prod_upload } from "../controllers/file_upload.controller"
import auth from "../middleware/auth.middleware";
import util from "util"

const prodrout = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended : true});
var jsonParser = bodyParser.json();
var multer_file = prod_upload.array('thumbnail', 5);
var multer_middleware = util.promisify(multer_file);

prodrout.post("/add-product", auth, urlencodedParser, multer_middleware, addProd);
prodrout.get("/product-listing/:page", getAllProd);
prodrout.get("/single-product/:prod_ID", getSingleProd);
prodrout.patch("/update-single-product/:prod_ID", auth, urlencodedParser, multer_middleware, updateProd);
prodrout.post("/update-single-product/:prod_ID/:img", auth,  urlencodedParser, multer_middleware, deltthumb);
prodrout.delete("/delete-product/:prod_ID", auth, deletProd);

//export default prodrout;
module.exports = {prodrout, multer_middleware};
