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
    argon2.hash(pass, cfg.argon2cfg).then(passHash =>{
        userModel.create(user, passHash).then(a => {
            console.log(a);
            ret.success = true;
            ret.message = "Registration successful";
            return res.json(ret);
        }).catch(a => {
            console.error(a);
            ret.success = false;
            ret.message = "Registration failed";
            return res.json(ret);
        });
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

    if (user === "bruh" && pass === "bruh") // replace this shit and the secret key later lmao
    {
        jwt.sign(
            { "user": user }, 
            keys.keys.private, 
            { algorithm: "RS256", expiresIn: cfg.jwtTokenTime }, 
            (err, token) => {
                if (err)
                {
                    ret.success = false;
                    token = err;
                    return res.json(ret);   
                }

                ret.success = true;
                ret.token = token;
                return res.json(ret);
            }
        );
    }
    else
    {
        ret.success = false;
        return res.json(ret);
    }

});

module.exports = router;
