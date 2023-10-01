import productModel from "../models/product.model";
import { prod_upload } from "./file_upload.controller";
import fs from "fs"
import path from "path";

export const addProd = (req, res) => {
  try {
   if(req.files != 0){
    const upload_dir = "../public/images/product_images";
    const corr_path = path.join(__dirname, upload_dir);
    const img_upload = prod_upload.array('thumbnail', 5);
    let thumbnail = []

    const {title, description, price, discount_percent, rating, stock, brand, prod_cat_id} = req.body;
    
    if(req.files.length > 0){
    for(let i = 0; i < req.files.length; i ++){
       const element = req.files[i]
       thumbnail.push(element.filename)
    }
   }

    if(!fs.existsSync(upload_dir)){
      fs.mkdirSync(corr_path, {recursive : true});
    }

    img_upload(req,res,function(err){
      //   if (err) {
      //       return res.status(400).json({message:err})
      //   }

    const prod_data = new productModel ({
        title : title,
        description : description,
        price : price,
        discount_percent : discount_percent,
        rating : rating,
        stock : stock,
        brand : brand,
        prod_cat_id : prod_cat_id,
        thumbnail : thumbnail
     })
     
     const save_prod = prod_data.save();
    
     if(prod_data){
        res.status(201).json({
            message: "Product added successfully"
        })
     }
     else{
        res.status(400).json({
            message:'Something went wrong!'
        })
     }
    })
   }
   else{
      const {title, description, price, discount_percent, rating, stock, brand, prod_cat_id} = req.body;

      const prod_data = new productModel ({
         title : title,
         description : description,
         price : price,
         discount_percent : discount_percent,
         rating : rating,
         stock : stock,
         brand : brand,
         prod_cat_id : prod_cat_id,
      })

      const save_prod = prod_data.save();

      if(prod_data){
         res.status(201).json({
             message: "Product added successfully"
         })
      }
      else{
         res.status(400).json({
             message:'Something went wrong!'
         })
      }
   }
  } catch (error) {
     res.status(500).json({
         message:error.message
     })
  }
}

export const getAllProd = async (req, res) => {
    try {

      const {q} = req.query;
      const page = parseInt(req.params.page);
      let list_prod = [];

      if(q != undefined && page == 1){
         list_prod = await productModel.find({$or: [
            { title : { $regex: `.*${q}.*`, $options: "i" } },
            { description: { $regex: `.*${q}.*`, $options: "i" } },
          ],}).populate({path : "prod_cat_id", model : "category"}).skip(0).limit(5);
      }
      else if(q != undefined && page == 2){
         list_prod = await productModel.find({$or: [
            { title: { $regex: `.*${q}.*`, $options: "i" } },
            { description: { $regex: `.*${q}.*`, $options: "i" } },
          ],}).populate({path : "prod_cat_id", model : "category"}).skip(5).limit(5);
      }
      else if(q != undefined && page == 3){
         list_prod = await productModel.find({$or: [
            { title: { $regex: `.*${q}.*`, $options: "i" } },
            { description: { $regex: `.*${q}.*`, $options: "i" } },
          ],}).populate({path : "prod_cat_id", model : "category"}).skip(10).limit(5);
      }
      else if(q != undefined && page == 4){
         list_prod = await productModel.find({$or: [
            { title: { $regex: `.*${q}.*`, $options: "i" } },
            { description: { $regex: `.*${q}.*`, $options: "i" } },
          ],}).populate({path : "prod_cat_id", model : "category"}).skip(15).limit(5);
      }
      else if(q != undefined && page == 0){
         list_prod = await productModel.find({$or: [
            { title: { $regex: `.*${q}.*`, $options: "i" } },
            { description: { $regex: `.*${q}.*`, $options: "i" } },
          ],}).populate({path : "prod_cat_id", model : "category"})
      }



      else if(page == 0){
         list_prod = await productModel.find({}).populate({path : "prod_cat_id", model : "category"})
      }
      else if(page == 4){
         list_prod = await productModel.find({}).populate({path : "prod_cat_id", model : "category"}).skip(15).limit(5);
      }
      else if(page == 3){
         list_prod = await productModel.find({}).populate({path : "prod_cat_id", model : "category"}).skip(10).limit(5);
      }
      else if(page == 2){
         list_prod = await productModel.find({}).populate({path : "prod_cat_id", model : "category"}).skip(5).limit(5);
      }
      else if(page == 1){
         list_prod = await productModel.find({}).populate({path : "prod_cat_id", model : "category"}).skip(0).limit(5);
      }



       if (list_prod.length == 0) {
          return  res.status(400).json({
            message: "Products doesn't exist on database please do add products."
          })
       }

        if(list_prod){
         return res.status(200).json({
              data : list_prod,
              message: "All product fetched successfully"
          })
       }
       else{
         return  res.status(400).json({
              message:'Something went wrong!'
          })
       }

    } catch (error) {
       res.status(500).json({
           message:error.message
       })
    }
  }

  export const getSingleProd = async (req, res) => {
    try {
       
       const prod_ID = req.params.prod_ID;
       const sing_prod = await productModel.findOne({_id : prod_ID});
      
       if (sing_prod == null) {
         return res.status(400).json({
          message: "Products doesn't exist on database please do add products."
          })
          // res.setHeader('Content-Type', 'application/json');
          // res.status(400).json({
          //    message: "Products doesn't exist on database please do add products."
          //    })
          //res.send("Products doesn't exist on database please do add products.");
          // res.setHeader(
          //   // 'Content-Length': Buffer.byteLength(body),
          //   'Content-Type', 'application/json'
          // );
          // res.end("Products doesn't exist on database please do add products.");
       }
       if(sing_prod){
          res.status(200).json({
              data : sing_prod,
              message: "All product fetched successfully"
          })
       }
       else{
          res.status(400).json({
              message:'Something went wrong!'
          })
       }

    } catch (error) {
       res.status(500).json({
           message:error.message
       })
    }
  }

  export const updateProd = async (req, res) => {
    try {
      if(req.files != 0){
      const prod_ID = req.params.prod_ID;
      const img_upload = prod_upload.array('thumbnail', 5);
      let thumbnail = [];
      let old_prod_img = [];
      const sing_prod = await productModel.findOne({_id : prod_ID});
            old_prod_img = sing_prod.thumbnail;
      const upload_dir = "../public/images/product_images";

      const {title, description, price, discount_percent, rating, stock, brand, prod_cat_id} = req.body;
      
      if(old_prod_img.length > 0){
         for(let j = 0; j < old_prod_img.length; j ++){
            thumbnail.push(old_prod_img[j])
         }
      }

      if(req.files.length > 0){
         for(let i = 0; i < req.files.length; i ++){
            const element = req.files[i]
            thumbnail.push(element.filename)
         }
      }

    img_upload(req,res, async function(err){
         //  if (err) {
         //      return res.status(400).json({message:err})
         //  }
       
       const update_prod = await productModel.updateOne(
        {_id : prod_ID},
        {$set : {title : title,
                 description : description,
                 price : price,
                 discount_percent : discount_percent,
                 rating : rating,
                 stock : stock,
                 brand : brand,
                 prod_cat_id : prod_cat_id,
                 thumbnail : thumbnail
                }}
        );

       if(update_prod.acknowledged){
          res.status(201).json({
              message: "Product updated successfully"
          })
       }
       else{
          res.status(400).json({
              message:'Something went wrong!'
          })
       }
      })
      }
      else{
         const prod_ID = req.params.prod_ID;
         const {title, description, price, discount_percent, rating, stock, brand, prod_cat_id} = req.body;

         const update_prod = await productModel.updateOne(
            {_id : prod_ID},
            {$set : {title : title,
                     description : description,
                     price : price,
                     discount_percent : discount_percent,
                     rating : rating,
                     stock : stock,
                     brand : brand,
                     prod_cat_id : prod_cat_id,
                    }}
            );

            if(update_prod.acknowledged){
               res.status(201).json({
                   message: "Product updated successfully"
               })
            } else{
               res.status(400).json({
                   message:'Something went wrong!'
               })
            }
      }
    } catch (error) {
       res.status(500).json({
           message:error.message
       })
    }
  }

  export const deltthumb = async (req, res) => {
   try {
      let pull_thumb;
      let old_prod_img = [];
      const prod_ID = req.params.prod_ID;
      const img = req.params.img;
      const sing_prod = await productModel.findOne({_id : prod_ID});
            old_prod_img = sing_prod.thumbnail;
      const upload_dir = "../public/images/product_images";

      if(img != undefined){

         if(old_prod_img.length > 0){
           for(let i = 0; i < old_prod_img.length; i ++){
              if(old_prod_img[i] == img){
                 const corr_path = path.join(__dirname, upload_dir + "/" + old_prod_img[i]);
                 if(fs.existsSync(corr_path)){
                 fs.unlink("./public/images/product_images/" + old_prod_img[i], (err => {
                   if (err) return res.status(400).json({message:err});
                   else {
                     console.log("One file deleted");
                   }
                 }));
               }
              }
           }
         }
         
         if(old_prod_img.length > 0){
           for(let i = 0; i < old_prod_img.length; i ++){
              if(old_prod_img[i] == img){
                  pull_thumb = await productModel.updateOne({_id : prod_ID}, {$pull: {thumbnail: img}})
              }
           }
         }
     
         if(pull_thumb.acknowledged){
           return res.status(201).json({
              message: "One thumbnail deleted successfully"
          })
         }
         else{
           return res.status(400).json({
              message:'Something went wrong!'
          })
         }
        }
      }catch (error) {
         res.status(500).json({
             message:error.message
         })
      }
  }

  export const deletProd = async (req, res) => {
    try {
  
      const prod_ID = req.params.prod_ID;
      const sing_prod = await productModel.findOne({_id : prod_ID});
      const upload_dir = "../public/images/product_images";

      if(sing_prod.thumbnail.length > 0){
         for(let i = 0; i < sing_prod.thumbnail.length; i ++){
            const corr_path = path.join(__dirname, upload_dir + "/" + sing_prod.thumbnail[i]);

            if(sing_prod.thumbnail[i] != "default.png"){
               if(fs.existsSync(corr_path)){
                 fs.unlink("./public/images/product_images/" + sing_prod.thumbnail[i], (err => {
                   if (err) return res.status(400).json({message:err});
                   else {
                     console.log("One file deleted");
                   }
                 }));
               }
            }
         }
      }
       
       const delete_prod = await productModel.deleteOne({_id : prod_ID},);

       if(delete_prod.acknowledged){
          res.status(201).json({
              message: "Product deleted successfully"
          })
       }
       else{
          res.status(400).json({
              message:'Something went wrong!'
          })
       }
    } catch (error) {
       res.status(500).json({
           message:error.message
       })
    }
  }