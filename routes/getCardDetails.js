const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const RequireCardId  = require('../middleware/RequireCardId')

router.get('/getCardDetails',RequireCardId,(req,res)=>{
            res.status(200).json(req.cardDetails)
        })

module.exports = router