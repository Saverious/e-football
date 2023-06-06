const mongoose = require('mongoose');

const teamInfoSchema = new mongoose.Schema({
    teamId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Team'
    },

    wins:{
        type:Number,
        default:0
    },

    draws:{
        type:Number,
        default:0
    },

    loss:{
        type:Number,
        default:0
    },

    goals_for:{
        type:Number,
        alias:'GF',
        default:0
    },

    goals_against:{
        type:Number,
        alias:'GA',
        default:0
    }
});

// virtual for getting the number of matches played
teamInfoSchema.virtual('MP').get(function () {
    return this.wins + this.draws + this.loss;
});

// virtual for getting the goal difference
teamInfoSchema.virtual('GD').get(function () {
    return this.goals_for - this.goals_against;
});

// virtual for getting the team's points
teamInfoSchema.virtual('PTS').get(function () {
    const points = (this.wins * 3) + (this.draws * 1);
    return points;
});

module.exports = Team = mongoose.model('TeamInfo', teamInfoSchema);