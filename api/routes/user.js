
const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const authenticate = require('../middleware/authenticate')



router.post('/login',userController.loginController)

router.post('/register', userController.registerController)

router.get('/', authenticate, userController.getAllUserControlle)

//DELETE By ID
router.delete('/:id', authenticate, userController.deleteUser)



module.exports = router