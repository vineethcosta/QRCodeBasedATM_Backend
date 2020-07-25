const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const transactionDetailsSchema = new mongoose.Schema({
    transactionId:{
        type:String,
        required:true
    },
    cardId:{
        type:ObjectId,
        ref:"CardDetails"
    },
    type:{
        type:String,
        required:true
    },
    transactionAmount:{
        type:Number,
        required:true
    }
},{timestamps:true})

mongoose.model("TransactionDetails",transactionDetailsSchema)