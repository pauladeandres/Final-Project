const express = require('express')
const router = express.Router()
const { isLoggedIn, checkRoles } = require('../middlewares/index')
const uploader = require('../config/cloudinary.config')

router.post('/image', isLoggedIn, checkRoles('ADMIN', 'SUPPLIER'), uploader.single("imageData"), (req, res) => {

    if (!req.file) {
        res.status(500).json({ code: 500, message: 'Error loading the file' })
        return
    }

    res.json({ secure_url: req.file.path })
})

module.exports = router
