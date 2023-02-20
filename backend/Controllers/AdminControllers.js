const AdminModel = require("../Models/AdminModel");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");
const bcrypt = require('bcrypt')

const maxAge = 3*24*60*60;

const createToken = (id) => {
    return jwt.sign({id},"adminsecretkey",{
        expiresIn: maxAge
    });
};

const hashPassword = async(password)=>{
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        return passwordHash
    } catch (error) {
        console.log(error);
    }
}

module.exports.adminlogin = async (req, res) => {
    try {
        const{email,password} = req.body
        const adminExist = await AdminModel.findOne({email:email})
        if(adminExist){
            if(adminExist.email===email && adminExist.password===password){
                const token = createToken(adminExist._id);
    
                res.cookie("jwt",token,{
                    withCredentials : true,
                    httpOnly:false,
                    maxAge: maxAge * 1000,
                })
                res.status(201).json({admin:adminExist._id,created:true})
            }else{
                res.json({message:"email or password not matching",Invalid:false})
            }
        }else{
            res.json({message: "Invalid Credentials", status:false})
        }
    } catch (error) {
        console.log(error);
    }
};

exports.userData = async(req,res) =>{
    try {
        const userData = await UserModel.find()
        res.json({action:true , userData})
    } catch (error) {
        console.log(error)
    }
}

exports.addUser = async(req,res)=>{
    try {
        const {name, phone, email, password} =req.body;
        const newpassword = await hashPassword(password)
        const existUser = await UserModel.findOne({email})
        if(existUser){
            res.json({message:"Email is already registered", status:false})
        }else{
            const user = await UserModel.create({name,phone,email,password:newpassword})
            res.status(201).json({user:user._id,created:true})
        }
    } catch (error) {
        console.log(error);
    }
}

exports.userDetails = async(req,res)=>{
    try {
        const id = req.params.id
        const userData = await UserModel.findOne({_id:id})
        res.json({userData})
    } catch (error) {
        console.log(error);
    }
}

exports.editUser = async (req,res)=>{
    try {
        const {name, phone, email} = req.body;
        const existUser = await UserModel.findOne({email})
        if(existUser){
            res.json({message:"Email is already registered", state:false})
        }else{
            await UserModel.updateOne({name,phone,email})
            res.status(201).json({message:"Details updated",created:true})
        }
    } catch (error) {
        console.log(error);
    }

}

exports.userDelete = async (req,res)=>{
    try {
        const id = req.params.id;
        await UserModel.deleteOne({_id:id})
        res.status(201).json({message:"userDelete" , action:true})
    } catch (error) {
        console.log(error);
    }
}