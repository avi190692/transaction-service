const mongoose = require('mongoose');
const validator = require('validator')

const TrnsactionStatus = Object.freeze({
    PASSED: 'pass',
    PENDING: 'pending',
    FAILED: 'fail',
});

const TransactionSchema = mongoose.Schema( {
    accountFrom: {
        type: Number,
        unique: true,
        required: true,
        trim: true,
    },
    accountTo: {
        type: Number,
        unique: true,
        required: true,
        trim: true,
    },
    amountTransfer: {
        type: Number,
        required: true,
        trim: true,
    }, 
    status :  {
        type: String,
        enum: Object.values(TrnsactionStatus),
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
