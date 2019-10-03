const request = require('request-promise-native');
const axios = require('axios');
const nconf = require('nconf');
const stringify = require('json-stringify-safe')
const externalAPITimeout = nconf.get('api.externalAPITimeout');
const getRequest = async ({url, options}) => {
   try {
        const config = {
            headers: {
            accept: 'application/json',
            },
            data: {},
        };
       const res = await axios.get('https://reqres.in/api/users?page=1', config);
       //res.then(response => console.log("---"+response.data));
       console.log(res.data);
        return stringify(res.data);
   } catch(err) {
        console.log(err);
   }
        // return request.get(url, {...options, timeout: externalAPITimeout, json: true });
} 


module.exports.autoload = true
module.exports = {
    getRequest
}

function newFunction(url) {
    console.log(`-----***************************----${url}`);
}
