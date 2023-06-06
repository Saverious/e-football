const Team = require('../models/team');
const Fixure = require('../models/fixures');

exports.blog = (req,res)=>{
    try{
        res.render('pages/blog.ejs',{
            title:'Blogs'
        });
    }catch(err){
        console.error(err);
    }
}

exports.contact = (req,res)=>{
    try{
        res.render('pages/contact.ejs',{
            title:'Contact Us'
        });
    }catch(err){
        console.error(err);
    }
}

exports.index = async (req,res)=>{
    try{
        const team = await Team.find();
        res.render('pages/index.ejs',{
            title:'Home',
            team:team
        });
    }catch(err){
        console.error(err);
    }
}

// View fixures
exports.matches = async (req,res)=>{
    try{
        const fixure = await Fixure.find();
        res.render('pages/matches.ejs',{
            title:'Matches',
            fixure:fixure
        });
    }catch(err){
        console.error(err);
    }
}

exports.players = (req,res)=>{
    try{
        res.render('pages/players.ejs',{
            title:'Players'
        });
    }catch(err){
        console.error(err);
    }
}

exports.single = (req,res)=>{
    try{
        res.render('pages/single.ejs',{
            title:'Single'
        });
    }catch(err){
        console.error(err);
    }
}