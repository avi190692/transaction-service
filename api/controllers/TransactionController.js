const {findAccount} = require('../adaptors/AccountAdaptor');
const { Transaction, TrnsactionStatus } = require('../models/Transaction');
const nconf = require('nconf');
const stringify = require('json-stringify-safe')
const { publishCreditDebitMessage } = require('../producer/creditDebitProducer');

const doTransactionCtrl = async (req, reply) => {
    const transaction = new Transaction(req.body);
    try{
        debugger        
        transaction.status = TrnsactionStatus.PENDING;
        await transaction.save();
        const accountFrom = await findAccount(req.body.accountFrom);
        await publishCreditDebitMessage(accountFrom).catch((err) =>{
            throw err;
       });
        return accountFrom;
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