const mongoose = require('mongoose');

const fixureSchema = new mongoose.Schema({
    teams:{
        type:Array
    }
});

module.exports = mongoose.model('Fixure', fixureSchema);