import cartModel from "../models/cart.model";
import productModel from "../models/product.model";

export const addCart = async (req, res) => {
    try {
  
      const {prod_id, usr_id} = req.body;

      const prod_data = await productModel.findOne({_id : prod_id});
      const cart_fetched = await cartModel.find({usr_id : usr_id});

      for(let x in cart_fetched){

       if(cart_fetched[x].prod_id == prod_id){

         const cart_fetched_prod = await cartModel.findOne({prod_id : prod_id});
         const prod_qty_increament = cart_fetched_prod.prod_qty + 1;
         const save_cart = await cartModel.updateOne({prod_id : prod_id, usr_id : usr_id},
            {$set: 
              {
                 prod_qty: prod_qty_increament
              }
            }
            )

           if(save_cart){
           return res.status(201).json({
                message: "Cart added successfully"
            })
         }
          else{
          return res.status(400).json({
                message:'Something went wrong!'
            })
         }
         break;
       }

      }

      const cart_data = new cartModel ({
         prod_id : prod_id,
         prod_title : prod_data.title,
         prod_img : prod_data.thumbnail,
         prod_qty : 1,
         prod_price : prod_data.price,
         usr_id : usr_id,
        })
        const save_cart = cart_data.save();

        if(save_cart){
        return res.status(201).json({
             message: "Cart added successfully"
         })
      }
      else{
        return res.status(400).json({
             message:'Something went wrong!'
         })
      }

    } catch (error) {
       res.status(500).json({
           message:error.message
       })
    }
  }

  export const getCart = async (req, res) => {
    try {
       const usr_id = req.params.usr_id;
       const cart_data = await cartModel.find({usr_id : usr_id});
       const all_prod_price = []
       let total_price = 0;

    for(let x in cart_data){
       const prod_price = cart_data[x].prod_price
       const prod_qty = cart_data[x].prod_qty
       all_prod_price.push(prod_qty * prod_price)
    }
    
    for (var i = 0; i < all_prod_price.length; i++ ){
          total_price += all_prod_price[i] 

    }
       if (cart_data.length == 0) {
            res.status(400).json({
            message: "Cart is empty."
          })
       }
       else if(cart_data){
          res.status(200).json({
              data : cart_data,
              total_price : total_price,
              message: "All Cart data fetched successfully"
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

  export const cartdecrement = async (req, res) => {

       const {usr_id} = req.body;
       const prod_id = req.params.prod_id;

       const cart_data = await cartModel.findOne({usr_id : usr_id, prod_id : prod_id});

       if(cart_data == null || cart_data == 0){

            return res.status(200).json({
               message: "This product doesn't exist in your cart"
           })
       }
       else if(cart_data.prod_qty < 2 || cart_data.prod_qty == 1){

         const update_prod_cart = await cartModel.deleteOne({usr_id : usr_id, prod_id : prod_id})

         if(update_prod_cart){
            return res.status(201).json({
                 message: "Product form cart deleted successfully"
             })
          }
           else{
           return res.status(400).json({
                 message:'Something went wrong!'
             })
          }
          
       }
       else if (cart_data.prod_qty > 2 || cart_data.prod_qty != 1){

         const prod_qty_decrement = cart_data.prod_qty - 1;
         const decrement_prod_cart = await cartModel.updateOne({prod_id : prod_id, usr_id : usr_id},
            {$set: 
              {
                 prod_qty: prod_qty_decrement
              }
            }
            )

           if(decrement_prod_cart){
           return res.status(201).json({
                message: "Decreamented a quantity of product successfully"
            })
         }
          else{
          return res.status(400).json({
                message:'Something went wrong!'
            })
         }
       }
  }

  export const cartDeltOneProd = async (req, res) => {

   const {usr_id} = req.body;
   const prod_id = req.params.prod_id;

   const cart_data = await cartModel.findOne({usr_id : usr_id, prod_id : prod_id});

   if(cart_data == null || cart_data == 0){

        return res.status(200).json({
           message: "This product doesn't exist in your cart"
       })
   }
   else{

     const delete_prod_cart = await cartModel.deleteOne({usr_id : usr_id, prod_id : prod_id})

     if(delete_prod_cart){
        return res.status(201).json({
             message: "Product deleted from cart successfully"
         })
      }
       else{
       return res.status(400).json({
             message:'Something went wrong!'
         })
      }
      
   }

}

export const deltUsrCart = async (req, res) => {

   const usr_id = req.params.usr_id;

     const delete_usr_cart = await cartModel.deleteMany({usr_id : usr_id})

     if(delete_usr_cart.acknowledged){
        return res.status(201).json({
             message: "User cart deleted successfully"
         })
      }
       else{
       return res.status(400).json({
             message:'Something went wrong!'
         })
      }

}