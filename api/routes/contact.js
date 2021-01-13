const { Router } = require('express')
const express = require('express')
const router = express.Router()

const contactController = require('../controllers/contact')
const authenticate = require('../middleware/authenticate')

// GET
router.get('/', contactController.getAllContactController)

// POST
router.post('/', authenticate, contactController.PostNewContactController)

//GET By ID
router.get('/:id', contactController.getSingleContactId)



//Edite  ID
router.put('/:id', authenticate, contactController.editContact)




//Export module
module.exports = router