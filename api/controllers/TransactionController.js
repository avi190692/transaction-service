const {findAccount} = require('../adaptors/AccountAdaptor');
const { Transaction, TrnsactionStatus } = require('../models/Transaction');
const nconf = require('nconf');
const stringify = require('json-stringify-safe')
const { publishCreditDebitMessage } = require('../producer/creditDebitProducer');

const doTransactionCtrl = async (req, reply) => {
    let transaction = new Transaction(req.body);
    try{
        transaction.debitStatus = TrnsactionStatus.PENDING;
        transaction.creditStatus = TrnsactionStatus.PENDING;
        transaction = await transaction.save();
        const accountFrom = await findAccount(req.body.accountFrom);
        const accountTo = await findAccount(req.body.accountTo);
        accountFrom.balanceAmount = accountFrom.balanceAmount - req.body.amountTransfer;
        accountTo.balanceAmount = accountTo.balanceAmount + req.body.amountTransfer;
        const debitMessage = {"trnsactionId" : transaction.id,  "transactionType" : "Debit" , "accountUpdate" : accountFrom}
        const creditMessage = {"trnsactionId" : transaction.id, "transactionType" : "Credit" , "accountUpdate" : accountTo}
        await publishCreditDebitMessage(creditMessage).catch((err) =>{
            throw err;
        });
        await publishCreditDebitMessage(debitMessage).catch((err) =>{
            throw err;
        });
        return {"message": 'Transaction is in process'};
    } catch(err) {
        transaction.status = TrnsactionStatus.FAILED;
        transaction.save();
        console.log(err);
        throw err;
    }
}


module.exports = {
    doTransactionCtrl
}