const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10
const User = require('../models/user.model')
const Client = require('../models/client.model')
const { isLoggedIn, checkRoles } = require('./../middlewares/index')

const mongoose = require('mongoose')
const { checkMongooseError } = require('./../utils')

// SIGN UP (POST)
router.post('/signup', (req, res) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {

            if (user) {
                res.status(400).json({ code: 400, message: 'Email already exists' })
                return
            }

            if (password.length === 0) {
                res.status(400).json({ code: 400, message: 'Please, enter a password' })
                return
            }

            if (password.length < 5) {
                res.status(400).json({ code: 400, message: 'Password should be more than 5 characters' })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ email, password: hashPass })
                .then(() => res.json({ code: 200, message: 'User created' }))
                .catch(err => res.status(400).json({ code: 400, message: checkMongooseError(err) }))
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
router.get('/logout', isLoggedIn, (req, res) => {
    req.session.destroy((err) => res.json({ message: 'Logout successful' }));
})

// IS LOGGEDIN (POST)
router.post('/isloggedin', isLoggedIn, (req, res) => {
    req.session.currentUser ? res.json(req.session.currentUser) : res.status(401).json({ code: 401, message: 'Unauthorized' })
})

// CURRENT USER CLIENT DETAILS (GET)
router.get('/client/details', (req, res) => {
    User
        .findById(req.session.currentUser._id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Could not find any user', err }))
})

router.put('/client/update', (req, res) => {
    const { role, id } = req.body
    console.log(role, id)

    User
        .findByIdAndUpdate(id, { role })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Could not find any user', err }))
})

module.exports = router