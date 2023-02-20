const { register, login, uploadImage ,profile} = require("../Controllers/UserControllers");
const { checkUser } = require("../Middlewares/UserMiddleware");
const router = require("express").Router();
const upload = require('../Utils/multer')

router.post("/",checkUser)
router.post("/register",register);
router.post("/login",login)
router.post("/profile",profile)
router.post('/upload/:id',upload.single('photo'),uploadImage)

module.exports = router