require('dotenv').config();
const mongoose = require('mongoose');

exports.dbConnect = async () => {
    try{
        await mongoose.connect(process.env.CONSTRING,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then(() => console.log('connected to database'));
    }catch(err){
        console.error(err);
    }
}