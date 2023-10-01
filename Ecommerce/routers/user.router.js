import express from "express";
import bodyParser from "body-parser";
import {addUsr, getAllUsr, getSingleUsr, updateUsr, deletUsr} from "../controllers/user.controller"
import { usr_upload } from "../controllers/file_upload.controller"
import util from "util"

const usrrout = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended : true});
var jsonParser = bodyParser.json();
var multer_file = usr_upload.single('usr_img');
var multer_middleware = util.promisify(multer_file);

usrrout.post("/add-user", urlencodedParser, multer_middleware, addUsr);
usrrout.get("/user-listing", getAllUsr);
usrrout.get("/single-user/:usr_ID", getSingleUsr);
usrrout.patch("/update-single-user/:usr_ID", urlencodedParser, multer_middleware, updateUsr);
usrrout.delete("/delete-user/:usr_ID", deletUsr);

//export default usrrout;
module.exports = {usrrout, multer_middleware};