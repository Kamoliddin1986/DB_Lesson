const {Router} = require("express")
const userController = require("../controller/user_controller")

let router = Router()

router
     .get('/users', userController.GET)
     .post("/users", userController.CREATE_USER)
     .put('/update_user/:user_id', userController.UPDATE_USER)
     .delete("/delete_user/:user_id", userController.DELETE_USER)



module.exports = router