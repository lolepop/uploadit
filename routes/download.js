const express = require("express");

const cfg = require("../config");
const util = require("../lib/util");

const fileModel = require("../models/file");

const router = express.Router();

router.use(express.static(cfg.multerSettings.uploadDir));

router.get("/:filename", async (req, res, next) => {
    let reqFile = req.params.filename;

    const f = await fileModel.get(reqFile);
    if (f.length !== 1)
        return res.status(404).send("File not found");
    return res.sendFile(f[0]);

});

module.exports = router;