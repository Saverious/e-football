const Team = require('../models/team');
const TeamInfo = require('../models/teamInfo');


// function to create team info for the first time
exports.makeTeamInfo = async (teamId) => {
    const teamInfo = new TeamInfo({
        teamId:teamId,
        wins:0,
        draws:0,
        loss:0,
        goals_for:0,
        goals_against:0
    });

    await teamInfo.save();
}


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
}

exports.updateAwayTeam = async (atg, atn, htg) => {
    const team = await Team.findOne({name:atn});
    const teamInfo = await TeamInfo.findOne({teamId:team._id});

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
}