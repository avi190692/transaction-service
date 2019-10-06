const Transaction = require('../models/Transaction');

const updateTransaction = async (transaction) => {
    await Transaction.findByIdAndUpdate(
        // the id of the item to find
        transaction.id,
        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        transaction,
        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        {new: true},
        // the callback function
        (err, transaction) => {
        // Handle any possible database errors
            if (err) {console.log(err);}
            else {
                return transaction;  
            }
        }
    )
}

module.exports = {
    updateTransaction
}