const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const AccountDetails = mongoose.model("AccountDetails")
const TransactionDetails = mongoose.model("TransactionDetails")
const RequireCardId  = require('../middleware/RequireCardId')

router.post('/withdraw',RequireCardId,(req,res)=>{
    const {amount} = req.body
    if(!amount){
        return res.status(422).json({error:"Enter amount to be withdrawn"})
    }
    if(amount<=0){
       return res.status(422).json({error:"please correctly enter amount to be withdrawn"})
    }
    const transactionDetails = new TransactionDetails({
        transactionId:Math.random()*1000,
        cardId:req.cardDetails._id,
        type:'Withdraw',
        transactionAmount:amount
    })
    AccountDetails.findOne({cardId:req.cardDetails._id})
    .then(accountDetails=>{
        if(!accountDetails){
           return res.status(422).json({error:"AccountDetails not found"})
        }

        else if(accountDetails.balance<amount)
        {
            return res.status(422).json({error:"Insufficient Funds"})
        }
        else{
            AccountDetails.findOneAndUpdate({cardId:req.cardDetails._id},{$inc :{balance:-amount}},)
            .then(accountDetails=>{
                    transactionDetails.save().then(result=>{
                        res.json({TransactionDetails:result})
                    })
                })
                .catch(err=>{
                    console.log(err)
                })
        }
        })
        .catch(err=>{
            console.log(err)
        })
})

    module.exports = router
