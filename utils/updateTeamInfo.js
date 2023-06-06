const Team = require('../models/team');
const TeamInfo = require('../models/teamInfo');

/**
 * 
 * @param {*} htg - Home team goals
 * @param {*} htn - Home team name
 * @param {*} atg - Away team goals
 * @param {*} atn - Away team name
 */
exports.updateHomeTeam = async (htg, htn, atg) => {
    const team = await Team.findOne({name:htn});
    const teamInfo = await TeamInfo.findOne({teamId:team._id});
    if(teamInfo){
        let win = teamInfo.wins;
        let draw = teamInfo.draws;
        let loss = teamInfo.loss;
        let gf = teamInfo.goals_for;
        let ga = teamInfo.goals_against;

        if(htg > atg){
            win += 1, draw, loss;
        }else if(htg < atg){
            win, draw, loss += 1;
        }else{
            win, draw += 1, loss;
        }

        await TeamInfo.findByIdAndUpdate(teamInfo._id,{
            teamId:team._id,
            wins:win,
            draws:draw,
            loss:loss,
            goals_for:gf + htg,
            goals_against:ga + atg
        });
    }else{
        let win, draw, loss;

        if(htg > atg){
            win = 1, draw = 0, loss = 0;
        }else if(htg < atg){
            win = 0, draw = 0, loss = 1;
        }else{
            win = 0, draw = 1, loss = 0;
        }

        const teamInfo = new TeamInfo({
            teamId:team._id,
            wins:win,
            draws:draw,
            loss:loss,
            goals_for:htg,
            goals_against:atg
        });

        await teamInfo.save();
    }
}

exports.updateAwayTeam = async (atg, atn, htg) => {
    const team = await Team.findOne({name:atn});
    const teamInfo = await TeamInfo.findOne({teamId:team._id});

    if(teamInfo){
        let win = teamInfo.wins;
        let draw = teamInfo.draws;
        let loss = teamInfo.loss;
        let gf = teamInfo.goals_for;
        let ga = teamInfo.goals_against;

        if(atg > htg){
            win += 1, draw, loss;
        }else if(atg < htg){
            win, draw, loss += 1;
        }else{
            win, draw += 1, loss;
        }

        await TeamInfo.findByIdAndUpdate(teamInfo._id,{
            teamId:team._id,
            wins:win,
            draws:draw,
            loss:loss,
            goals_for:gf + atg,
            goals_against:ga + htg
        });
    }else{
        let win, draw, loss;

        if(atg > htg){
            win = 1, draw = 0, loss = 0;
        }else if(atg < htg){
            win = 0, draw = 0, loss = 1;
        }else{
            win = 0, draw = 1, loss = 0;
        }
        
        const teamInfo = new TeamInfo({
            teamId:team._id,
            wins:win,
            draws:draw,
            loss:loss,
            goals_for:atg,
            goals_against:htg
        });
        
        await teamInfo.save();
    }
}