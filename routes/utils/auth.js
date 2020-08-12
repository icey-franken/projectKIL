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
        try {
            const data = await jwt.verify(token, secret);
            console.log('----------------', data);
            if (data.id && data.username && data.iat && data.exp) return true;
            else return false;
        } catch (e) {
            console.log('inner e', e)
            return false;
        }
    })
}

module.exports = { getUserToken, checkUserToken }