const nconf = require('nconf');
const joinUrl = require('url-join');
const {getRequest} = require('../utils/httpClient');
const findAccountByAccountNumber = nconf.get('services-url.account-service.find.byAccountNo');

const findAccount = async (accountnumber) => {
    const url = joinUrl(findAccountByAccountNumber, accountnumber);
   let account = await getRequest( {url: url} );
   account.balanceAmount = account.balanceAmount - 50;
   return account;
}

module.exports = {
    findAccount
}