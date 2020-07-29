const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const SyncTransaction =  mongoose.model("SyncTransaction")
const RequireCardId  = require('../middleware/RequireCardId')

router.post('/deleteSyncOnTransactionCompleted',RequireCardId,(req,res)=>{
    SyncTransaction.remove({cardId:req.cardDetails._id})
        .then(result=>{
            res.status(200).json({syncTransaction:result})
        })
        .catch(err=>{
            res.status(500).json("Cannot Delete Sync")
    }) 
})
module.exports = router