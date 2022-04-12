const express=require('express');
// const { } = require('../http/controllers/categoryController');
const { requireSignin, adminMiddleware } = require('../http/middlewares/authMiddleware');
const { createProduct, getProductsWithCategories, getProducts, deleteProduct, updateProduct } = require('../http/controllers/productController');
const router = express.Router();
const multer = require('multer');
const nanoid =require('nanoid')
const path=require('path');


//used to store image in viewable format
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, nanoid.nanoid() + '-' + file.originalname)
    }
})


//where to store the image
const upload = multer({storage});


router.post('/product/create',requireSignin,adminMiddleware,upload.array('productPicture'),createProduct);
router.get("/product/getproduct",getProducts)
router.post("/product/delete/:id",deleteProduct);
router.post("/product/update/:id",updateProduct);
// router.get('/product/getdataset',getProductsWithCategories);



module.exports=router;