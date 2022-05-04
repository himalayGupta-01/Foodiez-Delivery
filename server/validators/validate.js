const { check,validationResult }= require('express-validator');

exports.validateSignUpRequest=[
    check('name').notEmpty().withMessage('Name is required'),
    check('name').isLength({min:2}).withMessage('Name must be atleast 2 character long'),
    
    check('email').notEmpty().withMessage('Email is required'),
    check('email').isEmail().withMessage('Valid Email is required'),
    
    check('phone').notEmpty().withMessage('Phone number is required'),
    check('phone').isNumeric().withMessage('Valid Phone number is required'),
    check('phone').isLength({min:10}).withMessage(' Phone Number must be atleast 10 character long'),
    
    check('password').notEmpty().withMessage(' Password is Required'),
    check('password').isLength({min:6}).withMessage(' Password must be atleast 6 character long'),
    
    // check("cpassowrd").re
    check('cpassword').notEmpty().withMessage('Confirm Password is Required'),
    check('cpassword').isLength({min:6}).withMessage('Confirm Password must be atleast 6 character long')
];

exports.validateSignInRequest=[
    check('email').notEmpty().withMessage('Email is required'),
    check('email').isEmail().withMessage('Enter a valid Email'),
    check('password').notEmpty().withMessage(' Password is Required'),
];

exports.isRequestValidated=(req,res,next)=>{
    const errors=validationResult(req);
    if(errors.array().length>0){
        return res.status(400).json({error:errors.array()[0].msg});
    }
    next();
}