const express = require("express");
const multer = require("multer");
const nanoid = require("nanoid");

const cfg = require("../config");
const util = require("../lib/util");

const fileModel = require("../models/file");

const router = express.Router();

const storage = multer.diskStorage({
	destination: cfg.multerSettings.uploadDir,
	filename: function(req, file, cb) {
		var origName = file.originalname.split(".");
		var newName = nanoid(5) + Date.now() + (origName.length > 1 ? "." + origName[origName.length-1] : "");

		cb(null, newName);
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: cfg.multerSettings.maxSize }
}).single("file");

// handles upload of a single file
router.post("/", util.verifyAuthToken, (req, res) => {
	
	let ret = util.createResponseObj("success", "download");
	
	upload(req, res, err => {
		if (err)
		{
			ret.success = false;
			ret.download = `Error: ${err.message}`
			return res.json(ret);
		}

		fileModel.create(req.file.filename, req.file.originalname, res.locals.authenticated ? res.locals.decoded.user : null);

		ret.success = true;
		ret.download = `${cfg.downloadRoute}${req.file.filename}`;
		return res.json(ret);

	});
	
});

module.exports = router;