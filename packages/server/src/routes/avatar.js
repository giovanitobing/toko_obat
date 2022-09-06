const express = require("express");
const router = express.Router();

const avatarController = require("../controller/avatar");
const fileUploader = require("../library/uploader");

router.post(
  "/:id",
  fileUploader({
    destinationFolder: process.env.USER_AVATAR,
    fileType: "image",
    prefix: "avatar",
  }).single("avatar"),
  avatarController.updateAvatar
);

module.exports = router;
