const { exec } = require('child_process');
const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');

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


async function GraphOrg(Path) {
    try {
        if (!fs.existsSync(Path)) throw new Error("File not Found");
        
        const form = new FormData();
        form.append("file", fs.createReadStream(Path));

        const { data } = await axios.post("https://graph.org/upload", form, {
            headers: form.getHeaders()
        });

        return "https://graph.org" + data[0].src;
    } catch (err) {
        throw new Error(err.toString());
    }
}

module.exports = { installPackage, enc, beautify, sleep, GraphOrg };
