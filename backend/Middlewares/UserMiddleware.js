const User = require("../Models/UserModel")
const jwt = require ("jsonwebtoken")

module.exports.checkUser = (req,res,next) => {
    try {
        const token = req.cookies.jwt;
        if(token){
            jwt.verify(token, "secretkey", async (error,decodedToken) => {
                if(error){
                    res.json({status: false})
                    next()
                }else{
                    const user = await User.findById(decodedToken.id)
                    if(user) res.json({status:true, user:user.email})
                    else res.json({status:false})
                    next();
                }
            })
        }else{
            res.json({status: false})
            next();
        }
    } catch (error) {
        console.log(error);
    }
}