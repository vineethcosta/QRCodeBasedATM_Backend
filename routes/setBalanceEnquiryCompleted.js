const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const SyncTransaction =  mongoose.model("SyncTransaction")
const RequireCardId  = require('../middleware/RequireCardId')

router.post('/setBalanceEnquiryCompleted',RequireCardId,(req,res)=>{
    SyncTransaction.findOneAndUpdate({cardId:req.cardDetails._id},{isBalanceEnquirySelected :true})
        .then(result=>{
            res.status(200).json({syncTransactions:result})
        })
        .catch(err=>{
            res.status(500).json("Cannot update Sync")
    }) 
})
module.exports = router