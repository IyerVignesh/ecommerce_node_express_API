import multer from "multer";
const maxSize = 2 * 1024 * 1024;

const prod_storage = multer.diskStorage({
    destination : function (req, file, cb) {
         cb(null, "./public/images/product_images");
    },
    filename : function (req, file, cb) {

         const uniqueSuffix = Date.now();
         const str_arr = file.originalname.split(".");
         const file_ext = str_arr.pop();
         const prod_filenme = str_arr.join("_");

         cb(null, prod_filenme + "_" + uniqueSuffix + "." + file_ext);
    }
 })

export const prod_upload = multer({storage : prod_storage, limits: { fileSize: maxSize }});

const usr_storage = multer.diskStorage({
     destination : function (req, file, cb) {
          cb(null, "./public/images/user_images");
     },
     filename : function (req, file, cb) {
 
          const uniqueSuffix = Date.now();
          const str_arr = file.originalname.split(".");
          const file_ext = str_arr.pop();
          const prod_filenme = str_arr.join("_");
 
          cb(null, prod_filenme + "_" + uniqueSuffix + "." + file_ext);
     }
  })

export const usr_upload = multer({storage : usr_storage, limits: { fileSize: maxSize }});