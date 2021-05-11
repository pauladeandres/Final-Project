const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const User = require('../models/user.model')
const Client = require('../models/client.model')

// SIGN UP (POST)
router.post('/signup', (req, res) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {

            if (user) {
                res.status(400).json({ code: 400, message: 'Email already exixts' })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ email, password: hashPass })
                .then(() => res.json({ code: 200, message: 'User created' }))
                .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating user', err }))
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err }))
})

// LOG IN (POST)
router.post('/login', (req, res) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            console.log('este es el usuario encontrado', user)
            if (!user) {
                res.status(401).json({ code: 401, message: 'Email not registered', err: "Wrong user" })
                return
            }

            if (bcrypt.compareSync(password, user.password) === false) {
                res.status(401).json({ code: 401, message: 'Incorect password', err: "Wrong password" })
                return
            }
            console.log('la sesion es', req.session)

            req.session.currentUser = user
            res.json(req.session.currentUser)
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err })
        )
})

// LOG OUT (GET)
router.get('/logout', (req, res) => {
    req.session.destroy((err) => res.json({ message: 'Logout successful' }));
})

// IS LOGGEDIN (POST)
router.post('/isloggedin', (req, res) => {
    req.session.currentUser ? res.json(req.session.currentUser) : res.status(401).json({ code: 401, message: 'Unauthorized' })
})

// CREATE CLIENT (POST)
router.post('/client/new', (req, res) => {

    const client = req.body

    Client
        .create(client)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error saving client', err }))
})

// CURRENT USER CLIENT DETAILS (GET)
router.get('/client/:id', (req, res) => {
    Client
        .find({ user: req.session.currentUser })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Could not find any user', err }))
})

// CURRENT SUPPLIER DETAILS (GET)
router.get('/supplier/new', (req, res) => { res.render('hola') })

router.post('/supplier/new', (req, res) => {
    const _id = req.session.currentUser._id
    const { firstName, secondName, company, address, zipcode, city, country, phone } = req.body

    Client
        .create({ firstName, secondName, company, address, zipcode, city, country, phone })
        .then(response => {

            User
                .findByIdAndUpdate(_id, { client: response._id }, { new: true })
                .then(user => console.log(user))
                .catch(err => console.log(err))
        })
        .catch(err => res.status(500).json({ code: 500, message: 'Could not find any user', err }))
})


module.exports = router