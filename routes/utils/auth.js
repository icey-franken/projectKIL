const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../../config').jwtConfig;

exports.getUserToken = async(user) => {
    return await jwt.sign({
            id: user.id,
            username: user.username
        },
        secret, { expiresIn: parseInt(expiresIn, 10) });
}