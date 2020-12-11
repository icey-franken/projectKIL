const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../../config').jwtConfig;
console.log(secret, expiresIn);
const getUserToken = async(user) => {
    return await jwt.sign({
            id: user.id,
            username: user.username
        },
        secret, { expiresIn: parseInt(expiresIn, 10) });
}

//this fn works - returns boolean of whether or not token is valid
// const checkUserToken = async(tokens) => {
//     return tokens.some(async(token) => {
//         await jwt.verify(token, secret);
//         // try {
//         //     // return (data.id && data.username && data.iat && data.exp)
//         // } catch (e) {
//         //     return false;
//         // }
//     })
// }

//new checkUserToken that returns the token, with a helper function that tells who that token belongs to?
//input is array of cookies, output is array of valid tokens
async function checkUserToken(tokens) {
    const validTokens = tokens.filter(async(token) => {
        try {
            return await jwt.verify(token, secret, err => {
                if (err) throw err;
                return true
            });
        } catch (err) { return false };
    });
    return validTokens[0];
};

async function getUserId(token) {
    // const userToken = checkUserToken(tokens);
    let userId = null;
    try {
        userId = jwt.decode(token).id;
    } catch (e) { return null };
    return userId;
};

module.exports = { getUserToken, checkUserToken, getUserId }
