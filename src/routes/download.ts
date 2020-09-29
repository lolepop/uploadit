import express = require("express");
import path = require("path");

import cfg = require("../config");
import util = require("../lib/util");

import fileModel = require("../models/file");

const router = express.Router();

// router.use(express.static(cfg.multerSettings.uploadDir));

router.get("/:filename", async (req, res, next) => {
    let reqFile = req.params.filename;

    const f = await fileModel.get(reqFile);
    console.log(f)
    
    if (!f)
        return res.status(404).send("File not found");
    return res.sendFile(cfg.multerSettings.uploadDir + f.filename);

});

module.exports = router;