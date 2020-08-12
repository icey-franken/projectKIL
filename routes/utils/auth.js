const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../../config').jwtConfig;

const getUserToken = async(user) => {
    return await jwt.sign({
            id: user.id,
            username: user.username
        },
        secret, { expiresIn: parseInt(expiresIn, 10) });
}

const checkUserToken = async(tokens) => {
    return tokens.some(async(token) => {
        await jwt.verify(token, secret);
    })
}

module.exports = { getUserToken, checkUserToken }