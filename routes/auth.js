const express = require("express");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const cfg = require("../config");
const keys = require("../lib/keys");
const util = require("../lib/util");

const userModel = require("../models/user");

const router = express.Router();

router.get("/", util.verifyAuthToken, (req, res) => {
    if (res.locals.authenticated)
        res.send(res.locals.decoded);
    else
        res.send("lol");
})

router.post("/register", (req, res) => {
    
    let user = req.body["username"];
    let pass = req.body["password"];
    
    let ret = util.createResponseObj("success", "message");

    if (!user || !pass)
    {
        ret.success = false;
        ret.message = "Invalid input";
        return res.json(ret);
    }

    // hash password with argon2 and add user to db
    argon2.hash(pass, cfg.argon2cfg).then(async passHash => {
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
    }).catch(err => {
        ret.success = false;
        ret.message = "Something went wrong...";
        return res.json(ret);
    });



});

router.post("/login", (req, res) => {
    
    let user = req.body["username"];
    let pass = req.body["password"];

    let ret = util.createResponseObj("success", "token");

    // find user with entered username
    userModel.get(user).then(async u => {
        if (u.length !== 1)
            throw new Error();

        let passHash = u[0].hash;

        // verify hash of provided password against hash in db
        let isHashSuccessful = await argon2.verify(passHash, pass, cfg.argon2cfg);
        if (!isHashSuccessful)
            throw new Error();

        // create jwt token for user to receive and auth with
        jwt.sign(
            { "user": user }, 
            keys.keys.private, 
            { algorithm: "RS256", expiresIn: cfg.jwtTokenTime }, 
            (err, token) => {
                if (err)
                    throw err;  

                ret.success = true;
                ret.token = token;
                return res.json(ret);
            }
        );

    }).catch(err => {
        ret.success = false;
        return res.json(ret);
    });

});

module.exports = router;
