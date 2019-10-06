const kafka = require('kafka-node')
const nconf = require('nconf');
const Transaction = require('../models/Transaction');
const { updateTransaction } = require('../services/TransactionService');
const Consumer = kafka.Consumer;
const Client = kafka.KafkaClient;
const client = new Client(nconf.get('kafka.server'));


const listenDebitCreditTransaction = new Consumer(
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

console.log(nconf.get('kafka.topics.transaction-status-update') +' is listening');

listenDebitCreditTransaction.on('message', async function(message) {
    handleMessage(message)
});

listenDebitCreditTransaction.on('error', function(err) {
    console.log('error'+ err);
});

async function handleMessage(message) {
    try {
        const updatedTransaction = JSON.parse(message.value);
        let account = new Transaction({
            "id" : updatedTransaction.trnsactionId,
            "transactionType" : updatedTransaction.transactionType
            "transactionStatus" : updatedTransaction.transactionStatus
        });
        account = await updateAccount(account);
        const trnsactionId = JSON.parse(message.value).trnsactionId;
        const transactionType = JSON.parse(message.value).transactionType;
        const transactionStatusUpdation = { 
            "trnsactionId" : trnsactionId,  
            "transactionType" : transactionType,
            "transactionStatus" : "PASSED"
        }
        await publishTransactionUpdateMessage(transactionStatusUpdation);
    } catch (err) {
        console.log(err)
    }  
}