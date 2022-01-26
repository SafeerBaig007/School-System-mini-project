const userModel = require('../models').user
const jwt = require('jsonwebtoken')
const keys = require('../../encryption_keys')

const createUser = async (req, res)=>{
    try {
        await userModel.create({
            first_name : req.body.first_name,
            last_name: req.body.last_name,
            dob : req.body.dob,
            phone: req.body.phone,
            email: req.body.email,
            password : req.body.password,
            user_type: req.body.user_type,
            join_date: '2022-1-24',
            school_id: req.body.school_id
        })
        return res.status(201).send('User is created')
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, message : error})
    }
}

const login = async (req, res)=>{
    try {
        let foundUsers = await userModel.findOne({
            where : {
                email: req.body.email 
            }
        })
        if (foundUsers && foundUsers.password === req.body.password){
            const user = {
                user_id: foundUsers.user_id,
                email : req.body.email,
                user_type :foundUsers.user_type
            }
            let token = jwt.sign(user, keys ,{expiresIn : '3h'})
            await userModel.update({token},{
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

const findUsersByType = async (req, res)=>{
    console.log(req.school_id)
    try {
        let foundUsers = await userModel.findAll({
            where : {
                user_type : req.user_type,
                school_id : req.admin.school_id
            }
        })
        return res.status(200).send(foundUsers)
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error})
    }
}

module.exports = {
    createUser,
    login,
    findUsersByType
}