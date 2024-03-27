const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
//const algorithm = 'aes-256-cbc';
const algorithm = 'aes-256-ctr';
const iv = Buffer.alloc(16, 0);

const encryptFile = (filePath, key) => {
    const data = fs.readFileSync(filePath);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);

    fs.writeFileSync(filePath, encryptedData);
    console.log(`Encrypted file: ${filePath}`);
};

const encryptDirectory = (directoryPath, key) => {
    const files = fs.readdirSync(directoryPath);

    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isFile()) {
            encryptFile(filePath, key);
        } else if (stats.isDirectory()) {
            encryptDirectory(filePath, key);
        }
    });
};

const encrypt = async (pathToEncrypt, key) => {
    const stats = fs.statSync(pathToEncrypt);

    if (stats.isFile()) {
        encryptFile(pathToEncrypt, key);
        return "Encrypted";
    } else if (stats.isDirectory()) {
        encryptDirectory(pathToEncrypt, key);
        return "Encrypted";
    } else {
        throw new Error("The provided path is neither a file or a directory.");
    }
};

module.exports = encrypt;