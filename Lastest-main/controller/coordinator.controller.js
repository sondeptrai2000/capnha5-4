const FaculityModel = require('../models/faculity')
const AccountModel = require('../models/account')
const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');
var saltRounds = 10;


let addCoordinator = (req,res)=>{
    FaculityModel.find(function(err,data){
        res.render('./coordinator/faculity_coordinator',{faculity:data})    
})
}

let doAddCoordinator=(req,res)=>{
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        let slug = req.body.slug;
        let role = req.body.role
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
                    role : "coordinator",
                    phone,
                    birthday,
                    address
                })
                newStudent.save(function(err,data){
                    if(err){
                        console.log(err)
                    }else{
                        res.redirect('/faculity/Coordinator/'+req.body.slug)

                        
                    }
    })
}

let update =(req,res)=>{
    AccountModel.findById(req.params.id)
    .then((data)=>
        FaculityModel.find(function(err,data){
        }).then(data1=>{
        res.render('coordinator/updateCoordinator',{account:data,faculity:data1})

        })
    )
}
let deleteCoordinator = (req,res)=>{
    AccountModel.findById({_id:req.params.id},function(err,data){
        let slug = data.slug
        AccountModel.deleteOne({
            _id :  req.params.id
        })
        .then(()=>{
            res.redirect('/faculity/Coordinator/'+ slug)
        })
    })
    
    
}
let doupdate =(req,res)=>{
    
    AccountModel.updateOne({
        _id : req.params.id
    }, req.body)
    .then(()=>{
        res.redirect('/faculity/Coordinator/'+ req.body.slug)
    })
}

module.exports ={
    addCoordinator,
    doAddCoordinator,
    doupdate,
    deleteCoordinator,
    update

}