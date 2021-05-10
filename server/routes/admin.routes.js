const express = require('express')
const router = express.Router()

const Client = require('./../models/client.model')

// Endpoints
router.get('/suppliers', (req, res) => {

    Client
        .populate('user')
        .find({ "user.role": "SUPPLIER" })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching suppliers', err }))

})

router.get('/clients', (req, res) => {

    Client
        .populate('user')
        .find({ "user.role": "CUSTOMER" })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching suppliers', err }))

})

router.get('/dashboard', (req, res) => {
    Client
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching clients', err }))
})



module.exports = router
