const {adminlogin, addUser, editUser, userDetails, userDelete} = require('../Controllers/AdminControllers')
const {userData} = require('../Controllers/AdminControllers')
const {checkAdmin} = require('../Middlewares/AdminMiddleware')
const router = require('express').Router()

router.post("/adminlogin",adminlogin)
router.post("/adminhome",checkAdmin)
router.get('/user',userData)
router.get('/details/:id',userDetails)
router.post('/create',addUser)
router.patch('/editUser',editUser)
router.delete('/userDelete/:id',userDelete)

module.exports = router