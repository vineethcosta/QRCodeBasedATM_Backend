const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const CardDetails =  mongoose.model("CardDetails")
const AccountDetails =  mongoose.model("AccountDetails")
const RequireCardId  = require('../middleware/RequireCardId')
router.get('/',(req,res)=>{
    res.json({"output":"IsAlive"})
})

router.post('/createCardDetails',(req,res)=>{
    const {cardId,cardHolderName,mobileNumber,pinId} = req.body 
    if(!cardId ||  !cardHolderName || !mobileNumber || !pinId ){
      return  res.status(422).json({error:"Please add all the fields"})
    }
    const cardDetails = new CardDetails({
        cardId,
        cardHolderName,
        mobileNumber,
        pinId
    })
    cardDetails.save().then(result=>{
        res.json({cardDetails:result})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post('/createAccountDetails',RequireCardId, (req,res)=>{
    const {accountId,balance,accountType} = req.body 
    if(!accountId ||!balance ||!accountType){
      return  res.status(422).json({error:"Please add all the fields"})
    }
    const accountDetails = new AccountDetails({
        accountId,
        cardId:req.cardDetails._id,
        accountType,
        balance
    })
    accountDetails.save().then(result=>{
        res.json({accountDetails:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router