const Category = require ("../../models/category")
const Product = require ("../../models/product")
const slugify=require('slugify');

exports.addCategory=(req,res)=>{

    const categoryObj={
        name:req.body.name,
        slug:slugify(req.body.name)
    }

    const cat = new Category(categoryObj);
    cat.save((error,category)=>{
        if(error) return res.status(400).json({error})
        if(category){
            return res.status(201).json({category})
        }
    });

}

exports.getCategories=(req,res)=>{
    Category.find({}).exec((error,categories)=>{
        if(error) return res.status(400).json({error})

        if(categories){
            return res.status(200).json({categories})
        }
    });

}

exports.updateCategory=async (req,res)=>{
    const categoryObj={
        name:req.body.name,
        slug:slugify(req.body.name)
    }
    const updatedCategory=await Category.findOneAndUpdate({_id:req.params.id},categoryObj,{new:true});
     return res.status(201).json(updatedCategory);
}

exports.deleteCategory=async (req,res)=>{
    const result=await Product.deleteOne({category:req.params.id}).exec((error,data)=>{
        if(error) return res.status(400).json(error)
    });  
    const result2 = await Category.findByIdAndDelete(req.params.id).exec((error,data)=>{
        if(error) return res.status(400).json(error)
        return res.status(200).json(data)
    }); 
   
}
