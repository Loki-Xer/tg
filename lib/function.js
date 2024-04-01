const { exec } = require('child_process');
const axios = require("axios");

function installPackage(packageName) {
    return new Promise((resolve, reject) => {
        exec(`npm install ${packageName}`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
}

function enc(match) {
    return axios.post("https://api.lokiser.xyz/post/obfuscator", { text: match })
        .then(response => response.data)
        .catch(error => {
            console.error("Error while calling obfuscator API:", error);
            throw error;
        });
}

function beautify(match) {
    return axios.post("https://api.lokiser.xyz/post/beautify", { code: match })
        .then(response => response.data)
        .catch(error => {
            console.error("Error while calling beautify API:", error);
            throw error;
        });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { installPackage, enc, beautify, sleep };
