const {Router} = require("express")
const userController = require("../controller/user_controller")

let router = Router()

router.get('/users', userController.GET)