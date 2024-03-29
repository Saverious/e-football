const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },

    league:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'League'
    }
},{
    timestamps:true
});

module.exports = Team = mongoose.model('Team',teamSchema);