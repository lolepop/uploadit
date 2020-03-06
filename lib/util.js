const jwt = require("jsonwebtoken");
const keys = require("../lib/keys");

function createResponseObj()
{
    return new Map(Array.from(arguments).map(i => [i.key, null]));
}

const verifyAuthToken = (req, res, next) => {
    res.locals.authenticated = false;

    let authHeader = req.header("authorization");

    if (!authHeader)
        return next();

    jwt.verify(
        authHeader,
        keys.keys.public,
        { algorithms: ["RS256"] },
        (err, decoded) => {
            if (!err)
            {
                res.locals.authenticated = true;
                res.locals.decoded = decoded;
            }
        }
    );

    return next();
};

module.exports = { createResponseObj, verifyAuthToken };