const League = require('../models/league');
const Team = require('../models/team');

// GET request : League Registration
exports.registerGet = (req, res) => {
    try{
        res.render('admin/regLeague.ejs',{
            title:'Register League',
            message1:req.flash('message1'),
            message2:req.flash('message2')
        });
    }catch(err){
        console.error(err);
    }
}

// POST request : League Registration
exports.registerPost = async (req, res) => {
    try{
        const leagueExists = await League.findOne({name: req.body.leagueName});

        if(!leagueExists){
            const league = new League({
                name:req.body.leagueName
            });

            await league.save().then(() => {
                req.flash('message1',`${req.body.leagueName} added to leagues`);
                res.redirect('/register-league');
            });
        }else{
            req.flash('message2',`${req.body.leagueName} already exists`);
            res.redirect('/register-league');
        }
    }catch(err){
        console.error(err);
    }
}

// GET request : Add team to league
exports.addTeamGet = async (req, res) => {
    try{
        const leagues = await League.find();
        res.render('admin/addTeam.ejs',{
            title:'Register Team',
            league:leagues,
            message1:req.flash('message1'),
            message2:req.flash('message2')
        });
    }catch(err){
        console.error(err);
    }
}

// POST request : Add team to league
exports.addTeamPost = async (req, res) => {
    try{
        const league = await League.findOne({name:req.body.league});
        const team = await Team.findOne({name: req.body.teamName});
        if(!team){
            const myTeam = new Team({
                name: req.body.teamName,
                league: league._id
            });
            await myTeam.save().then(() => {
                req.flash('message1',`${req.body.teamName} added`);
                res.redirect('/add-team');
            });
        }else{
            req.flash('message2',`${req.body.teamName} already exists`);
            res.redirect('/add-team');
        }
    }catch(err){
        console.error(err);
    }
}