//Start of Import
import Category from "../models/category.model"
//End of Import

//Start of getting all category
export const getCat = async (req, res) => {

    try {
     const fetchedCat = await Category.find();
     if(fetchedCat){
        // res.status(200).json({
        //     message : "Successfully inserted"
        // })
        res.send(fetchedCat)
     }
     else {
        res.status(400).json({
            message : "Fetching Failed"
        })
     }
        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}
//End of getting all category

//Start of getting single category
export const getSingleCat = async (req, res) => {

    try {
     const catID = req.params.catID;
     const fetchedCat = await Category.find({_id : catID});
     if(fetchedCat){
        // res.status(200).json({
        //     message : "Successfully inserted"
        // })
        res.send(fetchedCat)
     }
     else {
        res.status(400).json({
            message : "Fetching Failed"
        })
     }
        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}
//End of getting single category

//Start of inserting category
export const addCategory = (req, res) => {

    const {name, description} = req.body;

    try {

     const catData = new Category ({
        name : name,
        description : description
     })
     const saveCatData = catData.save();

     if(catData){
        res.status(200).json({
            // data: catData,
            message : "Successfully inserted"
        })
     }
     else {
        res.status(400).json({
            message : "Insertion Failed"
        })
     }
        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}
//End of inserting category

//Start of update category
export const updateCategory = async (req, res) => {

    try {
     const catID = req.params.catID;
     const {name, description} = req.body;
     const fetchedCat = await Category.updateOne(
        {_id : catID},
        {$set: {name : name, description : description}}
        );
     if(fetchedCat.acknowledged){
        res.status(200).json({
            message : "Successfully updated"
        })
     }
     else {
        res.status(400).json({
            message : "Update Failed"
        })
     }
        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}
//End of update category

//Start of deletion of category
export const deleteCategory = async (req, res) => {

    try {
     const catID = req.params.catID;
     const fetchedCat = await Category.deleteOne({_id : catID});
     if(fetchedCat.acknowledged){
        res.status(200).json({
            message : "Deleted successfully"
        })
     }
     else {
        res.status(400).json({
            message : "Delete Failed"
        })
     }
        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}
//End of deletion of category