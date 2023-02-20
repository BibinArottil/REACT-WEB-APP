const Admin = require("../Models/AdminModel")
const jwt = require ("jsonwebtoken")

module.exports.checkAdmin = (req,res,next) => {
    try {
        const token = req.cookies.jwt;
        if(token){
            jwt.verify(token, "adminsecretkey", async (error,decodedToken) => {
                if(error){
                    res.json({status: false})
                    next()
                }else{
                    const admin = await Admin.findById(decodedToken.id)
                    if(admin) res.json({status:true, admin:admin.email})
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