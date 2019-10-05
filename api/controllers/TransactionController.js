const {findAccount} = require('../adaptors/AccountAdaptor');
const transaction = require('../models/Transaction');
const nconf = require('nconf');
const stringify = require('json-stringify-safe')
const { publishCreditDebitMessage } = require('../producer/creditDebitProducer');

const doTransactionCtrl = async (req, reply) => {
    try{
        debugger
        const accountFrom = await findAccount(req.body.accountFrom);
        publishCreditDebitMessage(accountFrom);
        return accountFrom;
    } catch(err) {
        console.log(err);
        throw err;
    }
}


module.exports = {
    doTransactionCtrl
}