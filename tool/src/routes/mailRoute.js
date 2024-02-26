const express = require("express");
const router = express.Router();
const sendMail1 = require("../controllers/sendMail1");
const sendMail2 = require("../controllers/sendMail2");


router.route('/send-mail').post(sendMail1);

router.route('/send-mail2').post(sendMail2);

module.exports = router;