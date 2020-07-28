const mongoose = require('mongoose')
const CardDetails = mongoose.model("CardDetails")
module.exports = (req,res,next)=>{
    const {authorization} = req.headers

    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    const cardId = authorization
    CardDetails.findOne({cardId:cardId})
    .then(cardDetails=>{
        if(!cardDetails){
           return res.status(404).json({error:"CardDetails not found"})
        }
        else{
            req.cardDetails=cardDetails,
            next()
        }
    }).catch(err=>{
            console.log(err+ "Hey Guys" )
        })
    }