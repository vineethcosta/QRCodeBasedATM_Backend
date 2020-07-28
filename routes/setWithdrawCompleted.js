const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const SyncTransaction =  mongoose.model("SyncTransaction")
const RequireCardId  = require('../middleware/RequireCardId')

router.post('/setWithdrawCompleted',RequireCardId,(req,res)=>{
    SyncTransaction.findOneAndUpdate({cardId:req.cardDetails._id},{isWithdrawSelected :true})
        .then(result=>{
            res.status(200).json({syncTransaction:result})
        })
        .catch(err=>{
            res.status(500).json("Cannot update Sync")
    }) 
})
module.exports = router