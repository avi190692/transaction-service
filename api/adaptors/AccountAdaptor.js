const nconf = require('nconf');
const joinUrl = require('url-join');
const {getRequest} = require('../utils/httpClient');
const findAccountByAccountNumber = nconf.get('services-url.account-service.find.byAccountNo');

const findAccount = async (accountnumber) => {
    const url = joinUrl(findAccountByAccountNumber, accountnumber);
    return await getRequest( {url: url} );
}

module.exports = {
    findAccount
}