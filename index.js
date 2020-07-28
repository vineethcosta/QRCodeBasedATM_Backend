const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config.js')
var cors = require('cors')
app.use(cors())
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false

})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})
require('./models/AccountDetails')
require('./models/CardDetails')
require('./models/TransactionDetails')
require('./models/SyncTransaction')



app.use(express.json())
app.use(require('./routes/adminOperations'))
app.use(require('./routes/balanceEnquiry'))
app.use(require('./routes/deposit'))
app.use(require('./routes/setBarcodeScanned'))
app.use(require('./routes/withdraw'))
app.use(require('./routes/getCardDetails'))
app.use(require('./routes/setBalanceEnquiryCompleted'))
app.use(require('./routes/setWithdrawCompleted'))
app.use(require('./routes/setDepositCompleted'))
app.use(require('./routes/deleteSyncOnTransactionCompleted'))
app.use(require('./routes/getSyncDetails'))
app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})