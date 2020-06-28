import express = require("express");
import multer = require("multer");
import nanoid = require("nanoid");

import cfg = require("../config");
import util = require("../lib/util");

import fileModel = require("../models/file");
import { IDownloadResponse } from "./types/response";

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

interface UploadFile extends express.Request
{
	file: any
}

// handles upload of a single file
router.post("/", util.verifyAuthToken, async (req: UploadFile, res) => {
	let ret = util.createResponseObj<IDownloadResponse>("success", "download");

	try
	{
		await new Promise((resolve, reject) => {
			upload(req, res, err => {
				if (err) reject(err);
				resolve();
			});
		});

		await fileModel.create(req.file.filename, req.file.originalname, res.locals.authenticated ? res.locals.decoded.user : null);

		ret.success = true;
		ret.download = `${cfg.downloadRoute}${req.file.filename}`;
		return res.json(ret);

	}
	catch (error)
	{
		ret.success = false;
		ret.download = `Error: ${error.message}`
		return res.json(ret);
	}

});

module.exports = router;