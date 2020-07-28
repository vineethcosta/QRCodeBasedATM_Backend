const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const syncTransactionSchema = new mongoose.Schema({
    cardId:{
        type:ObjectId,
        ref:"CardDetails"
    },
    isBarcodeScanned:{
        type:Boolean,
        required:true
    },
    isDepositSelected:{
        type:Boolean,
        required:true
    },
    isWithdrawSelected:{
        type:Boolean,
        required:true
    },
    isBalanceEnquirySelected:{
        type:Boolean,
        required:true
    }
},{timestamps:true})

mongoose.model("SyncTransaction",syncTransactionSchema)