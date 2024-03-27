const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const encrypt = require("../controllers/encrypt");
const encryptChacha = require("../controllers/encryptChacha");
const decrypt = require("../controllers/decrypt");
const decryptChacha = require("../controllers/decryptChacha");
const myPath1 = "../controllers/assets/testDirectory/testDirectory2/Anapathe1.png";
const myPath2 = "../controllers/assets/testDirectory";
const myPath3 = "../controllers/assets/testProgram/VMware-player-full-17.5.0-22583795.exe";
const myPath4 = "../controllers/assets/testProgram/test.txt";
const myPath5 = "./src/controllers/assets/testProgram/test.txt";
const myPath6 = "./src/controllers/assets/testProgram/VMware-player-full-17.5.0-22583795.exe";
const myPath7 = "./src/controllers/assets/testDirectory";
const myPath8 = "./src/controllers/assets/testDirectory/testDirectory2/Anapathe1.png";

router.route('/encryptPath').post(async (req, res) => {
    // Start the timer
    console.time('queryTime');

    try {
        // If the key is not a buffer of 32 bits
        // const key = crypto.createHash('sha256').update(process.env.ENCRYPTION_KEY).digest('base64').substr(0, 32);
        
        // await encrypt(path.resolve(__dirname, `${myPath1}`), process.env.ENCRYPTION_KEY);
        const executablePath = process.argv[0];
        const executableDirectory = path.dirname(executablePath);
        console.log('My executable path is: ', executableDirectory);
        await encryptChacha(path.resolve(executableDirectory, `${myPath7}`), process.env.ENCRYPTION_KEY);

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

        // await decrypt(path.resolve(__dirname, `${myPath1}`), process.env.ENCRYPTION_KEY);
        const executablePath = process.argv[0];
        const executableDirectory = path.dirname(executablePath);
        await decryptChacha(path.resolve(executableDirectory, `${myPath7}`), process.env.ENCRYPTION_KEY);
        
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