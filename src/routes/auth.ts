import express = require("express");
import jwt = require("jsonwebtoken");
import argon2 = require("argon2");

import cfg = require("../config");
import keys = require("../lib/keys");
import util = require("../lib/util");

import userModel = require("../models/user");
import { LoginToken } from "./types/request";
import { IAuthResponse, IMessageResponse } from "./types/response";

const router = express.Router();

// verify auth token and get user info
router.get("/", util.verifyAuthToken, (req, res) => {
	
	// let ret = util.createResponseObj("success", "user", "token");
	let ret = util.createResponseObj<IAuthResponse>("success", "user", "token");
	
    if (res.locals.authenticated)
	{
		ret.success = true;
		ret.token = req.header("authorization");
		ret.user = res.locals.decoded.user;
        res.send(ret);
	}
	else
	{
		ret.success = false;
        res.send(ret);
	}
})

// register account
router.post("/register", async (req: express.Request<{}, {}, LoginToken>, res) => {
    
    let user = req.body.username;
    let pass = req.body.username;
    
    let ret = util.createResponseObj<IMessageResponse>("success", "message");

    if (!user || !pass)
    {
        ret.success = false;
        ret.message = "Invalid input";
        return res.json(ret);
    }

    // hash password with argon2 and add user to db
    try
    {
        const passHash = await argon2.hash(pass, cfg.argon2cfg);
        try
        {
            console.log(await userModel.create(user, passHash));
            ret.success = true;
            ret.message = "Registration successful";
            return res.json(ret);
        }
        catch (err)
        {
            // assuming error for violation of pk { [Error: SQLITE_CONSTRAINT: UNIQUE constraint failed: users.username] errno: 19, code: 'SQLITE_CONSTRAINT' }
            console.error(err);
            ret.success = false;
            ret.message = "Registration failed, user already exists";
            return res.json(ret);
        }
    }
    catch (error)
    {
        ret.success = false;
        ret.message = "Something went wrong...";
        return res.json(ret);
    }

});

// login and return auth token
router.post("/login", async (req: express.Request<{}, {}, LoginToken>, res) => {
    
    let user = req.body.username;
    let pass = req.body.password;

    let ret = util.createResponseObj<IAuthResponse>("success", "user", "token");
    
    // find user with entered username
    try
    {
        const userRet = await userModel.get(user);

        if (!userRet)
            throw new Error();

        let passHash = userRet.hash;

        // verify hash of provided password against hash in db
        if (!await argon2.verify(passHash, pass, cfg.argon2cfg))
            throw new Error();

        // create jwt token for user to receive and auth with
        jwt.sign(
            { user }, 
            keys.keys.private, 
            { algorithm: "RS256", expiresIn: cfg.jwtTokenTime }, 
            (err, token) => {
                if (err)
                    throw err;  

                ret.success = true;
                ret.token = token;
				ret.user = user;
                return res.json(ret);
            }
        );
    }
    catch (error)
    {
        ret.success = false;
        return res.json(ret);
    }

});

module.exports = router;
