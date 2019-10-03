const {getUsers} = require('../adaptors/userAdaptor');
const User = require('../models/User');
const nconf = require('nconf');
const { SignUpResponse } = require('../models/SignUpResponse');
const stringify = require('json-stringify-safe')


const getUsersCtrl = async (req, reply) => {
    try{
        const {page} = req.query;
        const users = await getUsers({page});
        return users;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

const findUserByNameCtrl = async (req, reply) => {
    try{
        const users = [] ;
        const us = await User.where('email', req.params.email);
        console.log(stringify(us));
        /*JSON.stringify(us, function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (users.indexOf(value) !== -1) {
                   return;
                }
                users.push(value);
            }
        });*/
        reply.send(stringify(us)); 
    } catch (err) {
        console.log(err);
    }
}

const registerUserCtrl = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = {
    getUsersCtrl,
    registerUserCtrl,
    findUserByNameCtrl
}