const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const AccountDetails = mongoose.model("AccountDetails")
const TransactionDetails = mongoose.model("TransactionDetails")
const RequireCardId  = require('../middleware/RequireCardId')


router.post('/deposit',RequireCardId,(req,res)=>{
    const {amount} = req.body
    if(!amount){
        return res.status(422).json({error:"Enter amount to be deposited"})
    }
    if(amount<=0){
       return res.status(422).json({error:"Please correctly enter amount to be deposited"})
    }
    const transactionDetails = new TransactionDetails({
        transactionId:Math.random()*1000,
        cardId:req.cardDetails._id,
        type:'Deposit',
        transactionAmount:amount,
    })
    AccountDetails.findOneAndUpdate({cardId:req.cardDetails._id},{$inc :{balance:amount}},)
    .then(accountDetails=>{
        if(!accountDetails){
           return res.status(404).json({error:"AccountDetails not found"})
        }
        else{
            transactionDetails.save().then(result=>{
                res.status(200).json({TransactionDetails:result})
            })
            .catch(err=>{
                res.status(500).json("Error while updating account")
            })
        }
    })
        .catch(err=>{
            res.status(500).json("Card Id details not linked to any account")
        })
    })
    module.exports = router
