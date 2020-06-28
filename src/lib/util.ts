import { IGenericResponse } from "../routes/types/response";

const jwt = require("jsonwebtoken");
const keys = require("../lib/keys");

export function createResponseObj<T>(...args: string[]): T
{
    // return new Map(Array.from(args).map(i => [i, null]));
    return args.reduce((acc: T, k: string, i: number) => (acc[k] = null, acc), {} as T);
}

export const verifyAuthToken = (req, res, next) => {
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

// module.exports = { createResponseObj, verifyAuthToken };