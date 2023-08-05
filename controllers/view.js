require('dotenv').config();
const TeamInfo = require('../models/teamInfo');
const Fixure = require('../models/fixures');
const { compare } = require('../utils/functions');
const { logging } = require('../config/logs');

exports.blog = (req, res)=>{
    try{
        res.render('pages/blog.ejs',{
            title:'Blogs'
        });
    }catch(err){
        logging.error(err);
    }
}

exports.contact = (req, res)=>{
    try{
        res.render('pages/contact.ejs',{
            title:'Contact Us'
        });
    }catch(err){
        logging.error(err);
    }
}

exports.index = async (req, res)=>{
    try{
        const teamInfo = await TeamInfo.find().populate('teamId');
        teamInfo.sort(compare);
        res.render('pages/index.ejs',{
            title:'Home',
            teamInfo:teamInfo
        });
    }catch(err){
        logging.error(err);
    }
}

// View fixures
exports.matches = async (req, res)=>{
    try{
        const url = process.env.MATCH_URL;
        const limit = 8;
        let fixure;
        let jump;
        let page;
        let next;
        let prev;
        let totalPages;
        let count = await Fixure.count();
        let result = count % limit;

        totalPages = (result === 0) ? count / limit : (((count / limit).toFixed(0)) * 1) + 1;
        page = (req.query.page) ? req.query.page * 1 : 1;
        jump = (page - 1) * limit;
        fixure = await Fixure.find().skip(jump).limit(limit);
        next = (page < totalPages) ? page + 1 : 1;
        prev = (page === 1) ? totalPages : page -1;
    
        res.render('pages/matches.ejs',{
            title:'Matches',
            fixure:fixure,
            url:url,
            next:next,
            prev:prev,
            page:page,
            totalPages:totalPages
        });
    }catch(err){
        logging.error(err);
    }
}

exports.players = (req, res)=>{
    try{
        res.render('pages/players.ejs',{
            title:'Players'
        });
    }catch(err){
        logging.error(err);
    }
}

exports.single = (req, res)=>{
    try{
        res.render('pages/single.ejs',{
            title:'Single'
        });
    }catch(err){
        logging.error(err);
    }
}