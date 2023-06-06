const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    }
},{
    timestamps:true
});

module.exports = League = mongoose.model('League', leagueSchema);