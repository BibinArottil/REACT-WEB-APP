const UserModel = require("../Models/UserModel");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const maxAge = 3*24*60*60;

const createToken = (id) => {
    return jwt.sign({id},"secretkey",{
        expiresIn: maxAge
    });
};

module.exports.register = async (req, res ) => {
    try {
        const userData = req.body;
        const passwordHash = await bcrypt.hash(userData.password, 10)
        const existUser = await UserModel.findOne({email:userData.email})
        if(existUser){
            res.json({message:"Email already registered", state:false})
        }else{
            const newUser = new UserModel ({
                name:userData.name,
                phone:userData.phone,
                email:userData.email,
                password:passwordHash
            })
            await newUser.save()
            const user = await UserModel.findOne({email:userData.email})
            const token = createToken(user._id)

            res.cookie("jwt",token,{
                withCredentials: true,
                httpOnly: false,
                maxAge: maxAge * 1000
            })
    
            res.status(201).json({user: user._id, create: true })
        }
    
    } catch (error) {
        console.log(error);
    }
};

module.exports.login = async (req, res) => {
    try {
        const user = req.body;
        const existUser = await UserModel.findOne({email:user.email})
        if(existUser){
            const passwordMatch = await bcrypt.compare(user.password, existUser.password)
            if(user.email==existUser.email && passwordMatch==true){
                const token = createToken(existUser._id)

                res.cookie("jwt",token,{
                    withCredentials: true,
                    httpOnly: false,
                    maxAge: maxAge * 1000
                })
                res.status(200).json({user: existUser._id, create: true ,existUser})
            }else{
                res.json({message:"Email or password incorrect" , invalid:true })
            }
        }else{
            res.json({message:"Invalid credentials" ,state:false })
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.profile = async(req,res) =>{
    try {
        const id = req.body.id
        const user = await UserModel.findOne({_id:id})
        res.json({user})
    } catch (error) {
        console.log(error);
    }
}

module.exports.uploadImage = async (req,res) => {
    try {
        const userId = req.params.id
        const {filename} = req.file
        await UserModel.updateOne({_id:userId},{$set:{image:filename}})
        const userData = await UserModel.findOne({_id:userId})
        res.json({userData,active:true})
    } catch (error) {
        console.log(error);
    }
}

