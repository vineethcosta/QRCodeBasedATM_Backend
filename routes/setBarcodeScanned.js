const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const SyncTransaction =  mongoose.model("SyncTransaction")
const RequireCardId  = require('../middleware/RequireCardId')

router.post('/setBarcodeScanned',RequireCardId,(req,res)=>{
    const syncTransaction = new SyncTransaction({
        cardId: req.cardDetails._id,
        isBarcodeScanned: true,
        isDepositSelected: false,
        isWithdrawSelected: false,
        isBalanceEnquirySelected:false
    })
    syncTransaction.save().then(result=>{
        res.status(200).json({syncTransaction:result})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json("Cannot update Sync")
    })
})

module.exports = router