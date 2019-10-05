const { KafkaClient , Producer, ProduceRequest } = require('kafka-node');
const nconf = require('nconf');

const client = new KafkaClient(nconf.get('kafka.server'));
producer = new Producer(client);
creditDebitProducerReady = false ;

producer.on('ready', function () {
    console.log("Producer for creditDebit is ready");
    creditDebitProducerReady = true;
});

producer.on('error', function (err) {
    console.error(`Problem with creditDebit Kafka message ${err}`);
})

const publishCreditDebitMessage = ( message ) => { 
    payloads = [
        { topic: nconf.get('kafka.topics.credit-debit') , messages: JSON.stringify(message) }
    ];
    if (creditDebitProducerReady) {
        producer.send(payloads, function (err, data) {
            console.log(data);
        });
    } else {
        console.error("sorry, creditDebitProducer is not ready yet, failed to produce message to Kafka.");
    }
}

module.exports = {
    publishCreditDebitMessage
}