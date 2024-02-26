const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const encrypt = require("../controllers/encrypt");
const decrypt = require("../controllers/decrypt");

router.route('/encryptPath').post(async (req, res) => {
    // Start the timer
    console.time('queryTime');

    try {
        // If the key is not a buffer of 32 bits
        // const key = crypto.createHash('sha256').update(process.env.ENCRYPTION_KEY).digest('base64').substr(0, 32);
        await encrypt(path.resolve(__dirname, `../controllers/assets/testDirectory/testDirectory2/Anapathe1.png`), process.env.ENCRYPTION_KEY);

        // Stop the timer
        console.timeEnd('queryTime');

        // Send the response
        res.status(200).json({
            message: 'Directory or file successfully encrypted'
        });
    } catch (err) {
        // In case of an error, stop the timer and send an error response
        console.timeEnd('queryTime');
        res.status(500).json({
            error: err
        });
    }
});

router.route('/decryptPath').post(async (req, res) => {
    // Start the timer
    console.time('queryTime');

    try {
        // If the key is not a buffer of 32 bits
        // const key = crypto.createHash('sha256').update(process.env.ENCRYPTION_KEY).digest('base64').substr(0, 32);
        await decrypt(path.resolve(__dirname, `../controllers/assets/testDirectory/testDirectory2/Anapathe1.png`), process.env.ENCRYPTION_KEY);

        // Stop the timer
        console.timeEnd('queryTime');

        // Send the response
        res.status(200).json({
            message: 'Directory or file successfully decrypted'
        });
    } catch (err) {
        // In case of an error, stop the timer and send an error response
        console.timeEnd('queryTime');
        res.status(500).json({
            error: err
        });
    }
});

module.exports = router;