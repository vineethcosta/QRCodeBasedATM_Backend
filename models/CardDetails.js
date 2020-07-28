const mongoose = require('mongoose')

const cardDetailsSchema = new mongoose.Schema({
    cardId:{
        type:Number,
        required:true
    },
    pinId:{
        type:Number,
        required:true
    },
    cardHolderName:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true
    }
},{timestamps:true})

mongoose.model("CardDetails",cardDetailsSchema)