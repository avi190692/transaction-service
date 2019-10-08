const kafka = require('kafka-node')
const nconf = require('nconf');
const { Transaction, TrnsactionStatus } = require('../models/Transaction');
const { updateTransaction } = require('../services/TransactionService');
const Consumer = kafka.Consumer;
const Client = kafka.KafkaClient;
const client = new Client(nconf.get('kafka.server'));

const listenTransactionStatus = new Consumer(
    client,
    [{ topic: nconf.get('kafka.topics.transaction-status-update') }],
    {
        autoCommit: true,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: 'utf8',
        fromOffset: false
    }
);

console.log(nconf.get('kafka.topics.transaction-status-update') +' is listening' + ' in server ' + nconf.get('kafka.server'));

listenTransactionStatus.on('message', async function(message) {
    await handleMessage(message)
});

listenTransactionStatus.on('error', function(err) {
    console.log('error'+ err);
});

async function handleMessage(message) {
    try {
        const updatedTransaction = JSON.parse(message.value);
        const transactions = await Transaction.where('_id',updatedTransaction.trnsactionId);
        let transaction = transactions[0];
        if (updatedTransaction.transactionType === 'Debit') {
            if (TrnsactionStatus.PASSED === updatedTransaction.transactionStatus) {
                transaction.debitStatus = TrnsactionStatus.PASSED;
            } else if (TrnsactionStatus.FAILED === updatedTransaction.transactionStatus) {
                transaction.debitStatus = TrnsactionStatus.FAILED;
            }
        } else if (updatedTransaction.transactionType === 'Credit') {
            if (TrnsactionStatus.PASSED === updatedTransaction.transactionStatus) {
                transaction.creditStatus = TrnsactionStatus.PASSED;
            } else if (TrnsactionStatus.FAILED === updatedTransaction.transactionStatus) {
                transaction.creditStatus = TrnsactionStatus.FAILED;
            }            
        }
        transaction = await updateTransaction(transaction);
    } catch (err) {
        console.log(err)
    }  
}