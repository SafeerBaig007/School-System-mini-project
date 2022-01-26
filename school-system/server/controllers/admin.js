const adminModel = require('../models').admin
const jwt = require('jsonwebtoken')
const keys = require('../../encryption_keys')

const signup = async (req, res)=>{
    try {
        await adminModel.create({
            first_name : req.body.first_name,
            last_name: req.body.last_name,
            dob : req.body.dob,
            phone: req.body.phone,
            email: req.body.email,
            password : req.body.password
        })
        return res.status(201).send('Admin is created')
    } catch (error) {
        return res.status(500).send({success: false, message : error})
    }
}
const resetPassword = async (req, res)=>{
    try {
        await adminModel.update({
            password : req.body.new_password
        },{
            where: {
                email: req.admin.email
            }
        })
        return res.status(201).send('password has been updated is created')
    } catch (error) {
        return res.status(500).send({success: false, message : error})
    }
}
const login = async (req, res)=>{
    try {
        let foundAdmin = await adminModel.findOne({
            where : {
                email: req.body.email 
            }
        })
        if (foundAdmin && foundAdmin.password === req.body.password){
            const admin = {
                admin_id: foundAdmin.admin_id,
                email : req.body.email,
                user_type: 'admin',
                school_id: (await foundAdmin.getSchool()).school_id
            }
            let token = jwt.sign(admin, keys ,{expiresIn : '3h'})
            await adminModel.update({token},{
                where : {
                    email: req.body.email
                }
            })
            return res.status(200).send({token})
        }
        else return res.status(400).send({success: false, message : 'invalid password'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error})
    }
}

module.exports = {
    signup,
    login,
    resetPassword
}