const nconf = require('nconf');
const joinUrl = require('url-join');
const {getRequest} = require('../utils/httpClient');
const userAPI = nconf.get('url.userapi');
const url = joinUrl(userAPI,'users', '?page=${page}');
const getUsers = ({page = 1}) => getRequest({
    url: url
});

module.exports = {
    getUsers
}