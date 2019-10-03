const { getUsersCtrl, registerUserCtrl, findUserByNameCtrl  } = require('../controllers/userController');
const { validatePostSignup } = require('../validations/auth');

module.exports = async (fastify) => {
    fastify.get('/users', getUsersCtrl)
    fastify.post('/auth/signup', registerUserCtrl);
    fastify.get('/users/:email', findUserByNameCtrl)
} 



module.exports.autoload = true