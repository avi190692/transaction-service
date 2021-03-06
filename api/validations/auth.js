const validatePostSignup = {
    schema: {
        body:{
            type: 'object',
            properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string' },
            },
            required: ['email', 'password']
        }
    }
}

module.exports = {
    validatePostSignup
}