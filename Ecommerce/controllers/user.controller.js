import userModel from "../models/user.model";
import { usr_upload } from "./file_upload.controller"
import fs from "fs"
import path from "path";

export const addUsr = async (req, res) => {
    try {
      console.log(req.body)
      console.log(req.file)
      if(req.file){
        console.log("True")

      const upload_dir = "../public/images/user_images";
      const corr_path = path.join(__dirname, upload_dir);
      const img_upload = usr_upload.single('usr_img');
        
      const {name, age, gender, email, phone, username, password, birth_date} = req.body;
      const usr_img = req.file.filename;
  
      if(!fs.existsSync(upload_dir)){
        fs.mkdirSync(corr_path, {recursive : true});
      }
  
      img_upload(req,res, async function(err){
          // if (err) {
          //     return res.status(400).json({message:err})
          // }

      const usr_data = new userModel ({
          name : name,
          age : age,
          gender : gender,
          email : email,
          phone : phone,
          username : username,
          password : password,
          birth_date : birth_date,
          usr_img : usr_img
       })
       
       const save_usr = usr_data.save();
      
       if(usr_data){
          res.status(201).json({
              message: "User added successfully"
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
        console.log("False")
        const {name, age, gender, email, phone, username, password, birth_date} = req.body;
        
    const usr_data = new userModel ({
          name : name,
          age : age,
          gender : gender,
          email : email,
          phone : phone,
          username : username,
          password : password,
          birth_date : birth_date,
       })
       
       const save_usr = usr_data.save();
      
       if(usr_data){
          res.status(201).json({
              message: "User added successfully"
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

  export const getAllUsr = async (req, res) => {
    try {
       
       const list_usr = await userModel.find();

       if (list_usr.length == 0) {
            res.status(400).json({
            message: "Users doesn't exist on database please do add users."
          })
       }
       else if(list_usr){
          res.status(200).json({
              data : list_usr,
              message: "All users fetched successfully"
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

  export const getSingleUsr = async (req, res) => {
    try {
       
       const usr_ID = req.params.usr_ID;
       const sing_usr = await userModel.findOne({_id : usr_ID});
      
       if (sing_usr == null) {
         return res.status(400).json({
          message: "Users doesn't exist on database please do add user."
          })
       }
       if(sing_usr){
          res.status(200).json({
              data : sing_usr,
              message: "All users fetched successfully"
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

  export const updateUsr = async (req, res) => {
    try {
      console.log(req.body)
      console.log(req.file)
    if(req.file){

      const usr_ID = req.params.usr_ID;
      const sing_usr = await userModel.findOne({_id : usr_ID});
      const old_usr_img = sing_usr.usr_img;
      const upload_dir = "../public/images/user_images";
      const corr_path = path.join(__dirname, upload_dir + "/" + old_usr_img);
      const img_upload = usr_upload.single('usr_img');

      if(old_usr_img != "default.png"){
      if(fs.existsSync(corr_path)){
      fs.unlink("./public/images/user_images/" + old_usr_img, (err => {
        if (err) return res.status(400).json({message:err});
        else {
          console.log("One file deleted");
        }
      }));
    }
  }

    img_upload(req,res, async function(err){
          // if (err) {
          //     return res.status(400).json({message:err})
          // }
          const {name, age, gender, email, phone, username, password, birth_date} = req.body;
          const usr_img = req.file.filename;
       
       const update_usr = await userModel.updateOne(
        {_id : usr_ID},
        {$set : {
            name : name,
            age : age,
            gender : gender,
            email : email,
            phone : phone,
            username : username,
            password : password,
            birth_date : birth_date,
            usr_img : usr_img
                }}
        );

       if(update_usr.acknowledged){
          res.status(201).json({
              message: "User updated successfully"
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
  const {name, age, gender, email, phone, username, password, birth_date} = req.body;
  const usr_ID = req.params.usr_ID;

   const update_usr = await userModel.updateOne(
    {_id : usr_ID},
    {$set : {
        name : name,
        age : age,
        gender : gender,
        email : email,
        phone : phone,
        username : username,
        password : password,
        birth_date : birth_date,
            }}
    );

   if(update_usr.acknowledged){
      res.status(201).json({
          message: "User updated successfully"
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

export const deletUsr = async (req, res) => {
    try {
  
      const usr_ID = req.params.usr_ID;
      const sing_usr = await userModel.findOne({_id : usr_ID});
      const old_usr_img = sing_usr.usr_img;
      const upload_dir = "../public/images/user_images";
      const corr_path = path.join(__dirname, upload_dir + "/" + old_usr_img);

      if(old_usr_img != "default.png"){
      if(fs.existsSync(corr_path)){
        fs.unlink("./public/images/user_images/" + old_usr_img, (err => {
          if (err) return res.status(400).json({message:err});
          else {
            console.log("One file deleted");
          }
        }));
      }
    }
       
       const delete_usr = await userModel.deleteOne({_id : usr_ID},);

       if(delete_usr.acknowledged){
          res.status(201).json({
              message: "User deleted successfully"
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