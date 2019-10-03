const nconf = require('nconf');
const server = require('./server');
const loadSettings = require('./config/configurationAdaptor');
const { mongoConnect  } = require('./api/db/db');


const appSettingsPath = process.env.SETTINGS;
console.log("Setting file with name = " + appSettingsPath)
loadSettings({appSettingsPath}).then(() => {
    mongoConnect(nconf.get('db.mongodb.url'));
    const serverOptions = {
        logServerity: nconf.get('logServerity')
    }
    server.createServer(serverOptions)
})
.catch((err) => {
    console.log(err);
})