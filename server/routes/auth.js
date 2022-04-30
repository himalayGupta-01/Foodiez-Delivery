const express=require('express');
const router = express.Router();


const homeController = require('../http/controllers/homeController');
const authController = require('../http/controllers/authController');
const cartController = require('../http/controllers/customer/cartController');
const { validateSignUpRequest,validateSignInRequest, isRequestValidated } = require('../validators/validate');
const { requireSignin } = require('../http/middlewares/authMiddleware');



// setting paths
router.get('/', homeController().index)

router.post('/contact', (req,res)=>{
    res.status(200).json({user:'profile'})
    res.send('hello from contact page')
})

router.get('/cart', cartController().index)

router.post('/update-cart', cartController().update)

router.post('/increase-cart', cartController().increase)

router.post('/decrease-cart', cartController().decrease)

router.post('/remove-from-cart', cartController().remove)

//user registration route
router.post('/signup',validateSignUpRequest,isRequestValidated,authController().signup)

// user login route
router.post('/signin',validateSignInRequest,isRequestValidated,authController().signin)

//user logout route
router.post('/signout',authController().signout)

 
module.exports=router;