const FaculityModel = require('../models/faculity')
const AccountModel = require('../models/account')
const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');
var saltRounds = 10;
var cookie = require('cookie');

let addStudent = (req,res)=>{
    FaculityModel.find(function(err,data){
        res.render('./student/faculity_student',{faculity:data})    
})
}

let doAddStudent=(req,res)=>{
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        let slug = req.body.slug;
        let phone = req.body.phone;
        let address = req.body.address;
        let birthday = req.body.birthday
        
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(password, salt);
                let newStudent = AccountModel({
                    username,
                    password :hash,
                    email,
                    slug,
                    phone,
                    birthday,
                    address  
                })
                newStudent.save(function(err,data){
                    if(err){
                        console.log(err)
                    }else{
                        
                        res.redirect('/faculity/allstudent/'+ slug)
                    }
                })
}

let update =(req,res)=>{
    // AccountModel.findById(req.params.id)
    //     .then(data=>
    //         res.render('student/updatestudent',{account:data})
    //     )
   AccountModel.findById(req.params.id)
    .then((data)=>
        FaculityModel.find(function(err,data){
        }).then(data1=>{
        res.render('student/updatestudent',{account:data,faculity:data1})

        })
    )
}
let deleteStudent = (req,res)=>{
    AccountModel.findById({_id:req.params.id},function(err,data){
        let slug = data.slug
        AccountModel.deleteOne({
            _id :  req.params.id
        })
        .then(()=>{
            res.redirect('/faculity/allStudent/'+ slug)
        })
    })
    
    
}
let doupdate =(req,res)=>{
    AccountModel.updateOne({
        _id : req.params.id
    }, req.body)
    .then(()=>{
        res.redirect('/faculity/allStudent/'+ req.body.slug)
    })
}

let chat = (req,res)=>{
    AccountModel.findOne({
        _id : req.params.id,
    }).then(data=>{
    // res.render('./student/chat',{account:data})
         res.render('index',{account:data})
    })
}

module.exports ={
    addStudent,
    doAddStudent,
    doupdate,
    deleteStudent,
    update,
    chat
}