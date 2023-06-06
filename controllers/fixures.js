const Team = require('../models/team');
const Fixure = require('../models/fixures');
const { updateHomeTeam, updateAwayTeam } = require('../utils/updateTeamInfo');

// GET- create a fixure
exports.createFixureGet = async (req, res) => {
    try{
        const team = await Team.find();
        res.render('admin/fixures.ejs',{
            title:'Create fixure',
            team:team,
            message1:req.flash('required1'),
            message2:req.flash('message2')
        });
    }catch(err){
        console.error(err);
    }
}

// POST- create a fixure
exports.createFixurePost = async (req, res) => {
    try{
        if(req.body.homeTeam === 'xyz' || req.body.awayTeam ==='xyz'){
            req.flash('required1','Please select both home team and away team');
            res.redirect('/create-fixure');
        }else{
            const home = {
                "teamName":req.body.homeTeam,
                "goals":req.body.homeTeamGoals
            };
    
            const away = {
                "teamName":req.body.awayTeam,
                "goals":req.body.awayTeamGoals
            };
    
            const fix = [];
            fix.push(home, away);
    
            const fixure = new Fixure({
                teams:fix
            });

            await fixure.save().then(() => {
                req.flash('message2', 'Fixure created');
                res.redirect('/create-fixure');
            });
        }
    }catch(err){
        console.error(err);
    }
}

// GET- Update fixure
exports.updateFixureGet = async (req, res) => {
    try{
        const fixure = await Fixure.find();
        const finalFixure = fixure.filter(match => match.teams[0].goals === 'null');

        res.render('admin/updateFixure.ejs',{
            title:'Update Fixure',
            fixure:finalFixure,
            message1:req.flash('message1')
        });
    }catch(err){
        console.error(err);
    }
}

// POST- Update fixure
exports.updateFixurePost = async (req, res) => {
    try{
        const { fixureId, homeTeamGoals, homeTeamName, awayTeamGoals, awayTeamName } = req.body;
        const fixure = await Fixure.findByIdAndUpdate(fixureId,{
            teams:[
                {
                    teamName:homeTeamName,
                    goals:Number(homeTeamGoals)
                },
                {
                    teamName:awayTeamName,
                    goals:Number(awayTeamGoals)
                }
            ]
        });

        await fixure.save().then( async () => {
            const htg = Number(homeTeamGoals);
            const atg = Number(awayTeamGoals);
            await updateHomeTeam(htg, homeTeamName, atg).then(async () => {
                await updateAwayTeam(atg, awayTeamName, htg).then(() => {
                    req.flash('message1','Fixure updated');
                    res.redirect('/update-fixure');
                });
            });
        });
    }catch(err){
        console.error(err);
    }
}