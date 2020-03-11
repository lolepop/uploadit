const express = require("express");

const cfg = require("../config");

const router = express.Router();

router.get("/", (req, res) => {
    return res.json({
        size: cfg.multerSettings.maxSize
    });
});

module.exports = router;