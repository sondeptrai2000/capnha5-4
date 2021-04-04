const FaculityModel = require('../models/faculity')
const AccountModel = require('../models/account')
const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');
var DashboardtModel = require('../models/Dashboard')
var fileModel = require('../models/file');
const { findById } = require('../models/faculity');
var bcrypt = require('bcrypt');
const { response } = require('express');
var saltRounds = 10;
class AdminController {
    createAccount(req,res ){
        res.render("admin/createAccount")
    }
    docreateAccount(req,res ){
        var password = req.body.password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        let newAccount = AccountModel({
            username: req.body.username,
            password :hash,
            email: req.body.email,
            slug:"none",
            role : req.body.Role,
            phone:req.body.phone,
            birthday:req.body.birthday,
            address:req.body.address
        })
        newAccount.save(function(err,data){
            if(err){
                res.json(err)
            }else{
                res.redirect("/admin/addtoFaculty")           
            }
        })
    }
    

    addtoFaculty(req,res ){
        AccountModel.find({slug:"none",role:"student"},function(err,result){
            AccountModel.find({slug:"none",role:"coordinator"},function(err,result2){
                FaculityModel.find({},function(err,result3){
                    res.render("admin/addtoFaculty.ejs",{data:result,data2:result2,faculity: result3})
                })
            })
        })
    }
    doaddtoFaculty(req,res ){
        AccountModel.findOneAndUpdate({_id: req.params.id},{slug: req.body.slug},function(err,result){
           res.json(result)
        })
    }
}
module.exports = new AdminController;