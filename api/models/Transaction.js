const mongoose = require('mongoose');
const validator = require('validator')

const TrnsactionStatus = Object.freeze({
    PASSED: 'PASSED',
    PENDING: 'PENDING',
    FAILED: 'FAILED',
});

const TransactionSchema = mongoose.Schema( {
    accountFrom: {
        type: Number,
        required: true,
        trim: true,
        unique: false
    },
    accountTo: {
        type: Number,
        required: true,
        trim: true,
        unique: false
    },
    amountTransfer: {
        type: Number,
        required: true,
        trim: true,
        unique: false
    }, 
    debitStatus :  {
        type: String,
        enum: Object.values(TrnsactionStatus),
        unique: false
    },
    creditStatus :  {
        type: String,
        enum: Object.values(TrnsactionStatus),
        unique: false
    }
},
{
        timestamps: true
});

TransactionSchema.methods.toJSON = function () {
    const transaction = this
    const transactionObject = transaction.toObject()
    return transaction
}


Object.assign(TransactionSchema.statics, {
    TrnsactionStatus,
});

const Transaction = mongoose.model('transaction', TransactionSchema);

module.exports = { Transaction, TrnsactionStatus };
