
const Contact = require('../models/Contact')

// Show all Contacts
const getAllContactController = (req, res, next) => {
    Contact.find()
           .then(contacts => {
            res.status(200).json({
                message: 'All Contacts Info',
                contacts
            })
           })
           .catch(err => {
               console.log(err)
               res.status(500).json({
                   message: 'Error Occured for GetData',
                   error: err
               })
           })
}

// Create New Contact
const PostNewContactController = (req, res, next) => {
    const contact = new Contact ({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    })
    contact.save()
            .then(data => {
            res.status(201).json({
                message:'Contact ADDeD',
                contact: data
            })
            })
            .catch(err => {
                console.log(err)
                res.status(501).json({
                    message: 'Error Occured in new POST',
                    error: err
                })
            })
}

//Find by Contacts ID
const getSingleContactId = (req, res, next) => {
    let id = req.params.id
    Contact.findById(id)
        .then(contact => {
            res.status(200).json({
                contact
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occured with ID',
                error: err
            })
        })
}

//Edite Contacts
const editContact = (req, res, next) => {
    let id = req.params.id

    let updatedContact = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }

    Contact.findByIdAndUpdate(id, {$set: updatedContact})
        .then(contact => {
            res.status(200).json({
                message: 'Successfuly Edit!',
                contact
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occured with ID',
                error: err
            })
        })
    }

// Delete Contact By ID
const deleteContact = (req, res, next) => {
    let id = req.params.id

    Contact.findByIdAndRemove(id)
        .then(result => {
            res.status(200).json({
                message: 'Successfuly Deleted!',
                result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occured on Delete',
                error: err
            })
        })
}

module.exports = {
    getAllContactController,
    PostNewContactController,
    getSingleContactId,
    deleteContact,
    editContact
}