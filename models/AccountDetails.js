const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const accountDetailsSchema = new mongoose.Schema({
    accountId:{
        type:Number,
        required:true
    },
    cardId:{
        type:ObjectId,
        ref:"CardDetails"
    },
    balance:{
        type:Number,
        required:true
    },
    accountType:{
        type:String,
        required:true
    }
},{timestamps:true})

mongoose.model("AccountDetails",accountDetailsSchema)