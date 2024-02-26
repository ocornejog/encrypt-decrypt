const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const algorithm = 'aes-256-cbc';
const iv = Buffer.alloc(16, 0);

const decryptFile = (filePath, key) => {
    const data = fs.readFileSync(filePath);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decryptedData = Buffer.concat([decipher.update(data), decipher.final()]);

    fs.writeFileSync(filePath, decryptedData);
    console.log(`Decrypted file: ${filePath}`);
};

const decryptDirectory = (directoryPath, key) => {
    const files = fs.readdirSync(directoryPath);

    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isFile()) {
            decryptFile(filePath, key);
        } else if (stats.isDirectory()) {
            decryptDirectory(filePath, key);
        }
    });
};

const decrypt = async (pathToDecrypt, key) => {
    const stats = fs.statSync(pathToDecrypt);

    if (stats.isFile()) {
        decryptFile(pathToDecrypt, key);
        return "Decrypted";
    } else if (stats.isDirectory()) {
        decryptDirectory(pathToDecrypt, key);
        return "Decrypted";
    } else {
        throw new Error("The provided path is neither a file nor a directory.");
    }
};

module.exports = decrypt;