const mongoose = require("mongoose");

const DB = process.env.DATABASE_OFF;


//connecting database
mongoose.connect(DB).then(() => {
    console.log('connection successful')
}).catch((err) => {
    console.log(`no connection ${err}`)
});

