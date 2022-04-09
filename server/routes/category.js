const express=require('express');
const { addCategrory, getCategories } = require('../http/controllers/categoryController');
const { requireSignin, adminMiddleware } = require('../http/middlewares/authMiddleware');
const router = express.Router();


router.post('/category/create',requireSignin,adminMiddleware,addCategrory);
router.get('/category/getcategory',getCategories);



module.exports=router