
// import dependencies from npm
const Fastify = require('fastify');
const path = require('path');
const AutoLoad = require('fastify-autoload');
const uuidv4 = require('uuid/v4');
const pino = require('pino')();

// create request ids
let i = 0

const createServer = (option) => {
    console.log(__dirname);
    const { logServerity } = option;
    // create the server
    const server = Fastify({
        ignoreTrailingSlash: true,
        requestIdHeader:  'cust-req-id',
        disableRequestLogging: true,
        genReqId: function (req) { return i++ },
        logger: {
            level: logServerity,
            requestIdLogLabel: 'cust-req-id'          
        }
    });

    server.addHook('onRequest', (req, reply, done) => {
        req.log.info({ url: req.req.url, id: req.id }, 'received request')
        done()
    })
      
    server.addHook('onResponse', (req, reply, done) => {
        req.log.info({ url: req.req.originalUrl, statusCode: reply.reply }, 'request completed')
        done()
    })

    server.register(AutoLoad, {
        dir: path.join(__dirname, 'api', 'routes')
    }).ready(err => {
        if(err) {
            console.log(err);
            process.exit(1);
        }
        console.log(' has been loaded')
    });

    // start the server
    server.listen(9000, (err) => {
        if (err) {
            server.log.error(err);
            console.log(err);
            process.exit(1);
        }
        server.log.info('Server Started');
    });
}


module.exports = {
    createServer
}