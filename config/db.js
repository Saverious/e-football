require('dotenv').config();
const mongoose = require('mongoose');
const { logging } = require('./logs');

exports.dbConnect = async () => {
    try{
        await mongoose.connect(process.env.CONSTRING,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then(() => logging.info('connected to database'));
    }catch(err){
        logging.error(err);
    }
}