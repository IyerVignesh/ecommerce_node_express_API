import express from "express";
import {prodrout} from "./routers/product.router";
import catrout from "./routers/catergory.router";
import {usrrout} from "./routers/user.router"
import cartrout from "./routers/cart.router"
import usr_acc_rout from "./routers/user_account.router"
import mongoose from "mongoose";
import * as dotenv from "dotenv"

const app = express();
const dotenv_config = dotenv.config();
const port = process.env.DEV_PORT
const db_url = process.env.URL;

app.use(express.static(__dirname))

app.listen(port, (req, res) => {
    console.log(`The server is runing at ${port} port.`)
});

mongoose.connect(db_url).then(() => {
    console.log("Trycatch database connected");
})

app.use("/product", prodrout);
app.use("/category", catrout);
app.use("/user", usrrout);
app.use("/cart", cartrout);
app.use("/user", usr_acc_rout);
