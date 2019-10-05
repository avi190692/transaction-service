const { doTransactionCtrl  } = require('../controllers/TransactionController');
const { validatePostSignup } = require('../validations/auth');

module.exports = async (fastify) => {
    fastify.post('/transaction', doTransactionCtrl);
} 



module.exports.autoload = true