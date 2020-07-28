const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const AccountDetails = mongoose.model("AccountDetails")
const TransactionDetails = mongoose.model("TransactionDetails")
const RequireCardId  = require('../middleware/RequireCardId')

router.get('/balanceEnquiry',RequireCardId,(req,res)=>{
    const transactionDetails = new TransactionDetails({
        transactionId:Math.random()*1000,
        cardId:req.cardDetails._id,
        type:'BalanceEnquiry',
        transactionAmount:-1
    })
            AccountDetails.findOne({ cardId:req.cardDetails._id})
            .then(accountDetails=>{
                if(!accountDetails){
                   return res.status(422).json({error:"The given card has no account"})
                }
                else{
                    transactionDetails.save().then(result=>{
                        res.status(200).json({accountDetails:accountDetails})
                    })
                .catch(err=>{
                    res.status(500).json("Error while updating account")
                })
            }})
        .catch(err=>{
            res.status(500).json("Error while fetching balance")
        })
})
module.exports = router