const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const AccountDetails = mongoose.model("AccountDetails")
const CardDetails = mongoose.model("CardDetails")
const RequireCardId  = require('../middleware/RequireCardId')

router.get('/balanceEnquiry',RequireCardId,(req,res)=>{
    const {accountId} = req.body
    if(!accountId){
        return res.status(422).json({error:"Card not linked to any account"})
    }
    AccountDetails.findOne({accountId:accountId})
    .then(accountDetails=>{
        if(!accountDetails){
           return res.status(422).json({error:"AccountDetails not found"})
        }
        else{
            CardDetails.findById(accountDetails.cardId)
            .then(cardDetails=>{
                if(!cardDetails){
                   return res.status(422).json({error:"Card Details not found"})
                }
            res.json({accountDetails})
        })
    }
})
        .catch(err=>{
            console.log(err)
        })
    })
    module.exports = router