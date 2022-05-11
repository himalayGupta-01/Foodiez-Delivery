const User = require('../../models/userSchema');
const bcrypt=require("bcryptjs");

function authController(){
    return{
        async signup(req,res){

            const{name ,email,phone,password,cpassword}= req.body;

            if(!name || !email|| !phone|| !password|| !cpassword){
                return res.status(400).json({error:"Please Fill Fields Properly"})
            }

            try {
                const userExist = await User.findOne({email:email})

                if(userExist){
                    console.log("Email already exist");
                    return res.status(401).json({message:"Email already exist"}); //change
                }else if(password!=cpassword){
                    return res.status(401).json({error:"Password does not match"});
                }else{
                    const user=new User({name ,email,phone,password});

                await user.save();

                res.status(201).json(
                    {message:"User registered successfully"})
                }

            } catch (error) {
                console.log(error);
                res.status(500).json({message:"Internal server error"})
            }
        },
        async signin(req,res){
            try {
                const {email,password}=req.body;
        
                if(!email || !password){
                    console.log("invalid dta match")
                    return res.status(400).json({error:"Please  fill the data"})
                }
        
                const userLogin= await User.findOne({email:email});
        
                if(userLogin && userLogin.role==='customer'){
                    const isMatch = await bcrypt.compare(password,userLogin.password)
        
                    // creating jwt token 
                    const token = await userLogin.generateAuthToken();
                    
                    res.cookie("jwtToken",token,{
                        expires:new Date(Date.now()+(1000*60*60)),//1 hour
                        httpOnly:true
                    })
        
                    if(!isMatch){
                        console.log("not match");
                        return res.status(401).json({error:"Invalid Credentials"})
                    }else{
                        return res.status(200).json({token:token,user:userLogin,message:'Login Successfull'})
                    }
                }
                else{
                    console.log("invalid cred match");
                   return res.status(401).json({error:"Invalid Credentials"})
                }
        
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "internal server error", error: error })
            }
        },
        async signout(req,res){
            try {
               res.clearCookie('token');
               res.status(200).json({
                   message:'Signout Successfull...!'
               })
            } catch (error) {
               console.log(error);
            }
       }
    }
}

module.exports= authController