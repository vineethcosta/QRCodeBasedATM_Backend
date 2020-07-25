const mongoose = require('mongoose')

const cardDetailsSchema = new mongoose.Schema({
    cardId:{
        type:String,
        required:true
    },
    cardHolderName:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    }
},{timestamps:true})

mongoose.model("CardDetails",cardDetailsSchema)