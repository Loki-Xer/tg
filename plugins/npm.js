const { Command, installPackage } = require("../lib/");
const fs = require("fs");

Command({
    pattern: "pkg",
    type: "user",
    fromAdmin: true
}, async (message, match) => {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const dependencies = packageJson.dependencies || {};
    const devDependencies = packageJson.devDependencies || {};
    const packages = { ...dependencies, ...devDependencies };
    let packageList = '*All packages available*\n\n';
    for (const packageName in packages) {
        if (Object.prototype.hasOwnProperty.call(packages, packageName)) {
            const version = packages[packageName];
            packageList += `*${packageName} : ${version}*\n`;
        }
    }
    await message.reply(packageList).catch(error => {
        console.error("Error:", error);
        message.reply("An error occurred while listing packages.");
    });
});

Command({
    pattern: "install",
    type: "user",
    fromAdmin: true
}, async (message, match) => {
    if (!message.match) return message.reply("_provide a text_");
    await installPackage(message.match)
        .then(pkg => {
            message.reply(pkg);
        })
        .catch(error => {
            console.error("Error:", error);
            message.reply("An error occurred while installing the package.");
        });
});
