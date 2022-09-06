const jwt = require('jsonwebtoken');

const createToken = (payload, secret) => {
    return jwt.sign(payload, secret);
}
module.exports = createToken;