const mongoose=require("mongoose");

// const DB=process.env.DATABASE_OFF;
const DB="mongodb://localhost:27017/FoodDelievery";

//connecting database
mongoose.connect(DB).then(() => {
    console.log('connection successful')
}).catch((err) => {
    console.log(`no connection ${err}`)
});

