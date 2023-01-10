const express = require('express')
const router = express.Router()
const {generateQR} = require("../Controller/qrController")

router.get('/generateQR', generateQR)

module.exports = router