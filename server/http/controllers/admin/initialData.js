const Category =require("../../../models/category");
const Product=require("../../../models/product");


exports.initialData=async (req,res)=>{

    const categories=await Category.find({});
                                

    const products=await Product.find({})
                                .select("_id name price slug description productPictures category")
                                .populate({path: "category", select:"_id name"}) // it is used to get the data of the category also whose initially id was known (foreign key concept)
                                .exec();
                                
    res.status(200).json({
        categories,
        products
    })




}