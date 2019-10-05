const mongoose = require('mongoose');
const validator = require('validator')


const transactionSchema = mongoose.Schema( {
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
    }
},
{
        timestamps: true
});

transactionSchema.methods.toJSON = function () {
    const transaction = this
    const transactionObject = transaction.toObject()
    return transaction
}



const transaction = mongoose.model('transaction', transactionSchema);

module.exports = transaction;
