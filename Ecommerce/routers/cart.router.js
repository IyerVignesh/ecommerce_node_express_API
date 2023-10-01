import express from "express";
import bodyParser from "body-parser";
import {addCart, getCart, cartdecrement, cartDeltOneProd, deltUsrCart} from "../controllers/cart.controller"

const jsonParser = bodyParser.json()

const cartrout = express.Router();

cartrout.post("/add-cart", jsonParser, addCart);
cartrout.get("/cart-page/:usr_id", getCart);
cartrout.post("/decrement/:prod_id", jsonParser, cartdecrement);
cartrout.post("/delete-product/:prod_id", jsonParser, cartDeltOneProd);
cartrout.delete("/delete-usr-cart/:usr_id", deltUsrCart);

export default cartrout;

