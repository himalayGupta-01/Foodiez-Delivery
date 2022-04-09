const { check,validationResult }= require('express-validator');

exports.validateSignUpRequest=[
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Valid Email is required'),
    check('phone').isNumeric().withMessage('Valid Phone number is required'),
    check('password').isLength({min:6}).withMessage(' Password must be atleast 6 character long'),
    check('cpassword').isLength({min:6}).withMessage('Confirm Password must be atleast 6 character long')
];

exports.validateSignInRequest=[
    check('email').isEmail().withMessage('Valid Email is required'),
    check('password').notEmpty().withMessage('Password required'),
];

exports.isRequestValidated=(req,res,next)=>{
    const errors=validationResult(req);
    if(errors.array().length>0){
        return res.status(400).json({error:errors.array()[0].msg});
    }
    next();
}