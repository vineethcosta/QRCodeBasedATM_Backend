const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const RequireCardId  = require('../middleware/RequireCardId')
const SyncTransaction =  mongoose.model("SyncTransaction")

router.get('/getSyncDetails',RequireCardId,(req,res)=>{
    SyncTransaction.findOne({ cardId:req.cardDetails._id})
    .then(syncDetails=>{
        if(!syncDetails){
            res.status(404).json(syncDetails)
        }
        else{
          res.status(200).json({syncDetails:syncDetails})
    }})
.catch(err=>{
    res.status(500).json("Error while fetching balance")
})
})

module.exports = router