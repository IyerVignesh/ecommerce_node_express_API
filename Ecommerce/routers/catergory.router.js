import {addCategory, getCat, getSingleCat, updateCategory, deleteCategory} from "../controllers/category.controller"
import express from "express"
import bodyParser from "body-parser";

const jsonParser = bodyParser.json()
const catRoute = express.Router();

catRoute.post("/category-add", jsonParser, addCategory)
catRoute.get("/get-category", getCat)
catRoute.get("/get-category/:catID", getSingleCat)
catRoute.patch("/update-category/:catID",jsonParser,  updateCategory)
catRoute.delete("/delete-category/:catID", deleteCategory)

export default catRoute
