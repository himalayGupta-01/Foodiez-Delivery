const dotenv =require("dotenv");
const express =require("express");
const cors = require('cors');
const app =express();
const session =require('express-session');
const flash=require('express-flash');
const MongoDbStore=require('connect-mongo');
const path = require('path')

// dotenv configuration
dotenv.config({path:'./config.env'})

require("./db/connect");
const User =require('./models/userSchema')

//setting body parser (json to object)
app.use(express.json());


// session config
app.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    store:MongoDbStore.create({
        mongoUrl:"mongodb://localhost:27017"
    }),
    saveUninitialized:false,
    cookie:{maxAge:1000*24*60*60} // 24 hour
}))

app.use(flash());

// //global middleware
app.use((req,res,next)=>{
    res.locals.session=req.session;
    next()
})


// setting cross platform
app.use(cors({
    origin:["http://localhost:3000","http://localhost:4000"],
    credentials:true,
}));


//linking routes files (middleware) 
app.use(require('./routes/auth'));
app.use(require('./routes/admin/auth'));
app.use(require('./routes/category'));
app.use(require('./routes/product'));
app.use(require('./routes/order'));
app.use(require("./routes/admin/initialData"));

// for acessing static files through path name

app.use(express.static(path.join(__dirname,"uploads")));


//setting port
PORT= process.env.PORT || 8000;


// listening req at the PORT
app.listen(PORT,()=>{
    console.log(`listening at port ${PORT}`);
})