const { installPackage, enc, beautify, sleep, GraphOrg } = require("./function");
const fs = require('fs');

async function command(message) {
    try {
        switch (message.command) {
            case "pkg":
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
                await message.reply(packageList);
                break;
            case "install":
                if (!message.match) return message.reply("_provide a text_");
                const pkg = await installPackage(message.match);
                await message.reply(pkg);
                break;
            case "jid":
                await message.reply(message.jid.toString());
                break;
            case "enc":
                if (!message.match) return message.reply("_provide a text_");
                const Enc = await enc(message.match);
                await message.reply(Enc.message);
                break;
            case "beautify":
                if (!message.match) return message.reply("_provide a text_");
                const Beautify = await beautify(message.match);
                await message.reply(Beautify.message);
                break;
            case "ping":
                const start = new Date().getTime();
                const ping = await message.reply("*Ping!*");
                const end = new Date().getTime();
                await message.send("*Pong!*\n" + (end - start) + " ms", { type: "edit", chat_id: message.jid, message_id: ping.message_id, parse_mode: "Markdown" });
                break;
            case "runtime":
                const duration = process.uptime();
                const seconds = Math.floor(duration % 60);
                const minutes = Math.floor((duration / 60) % 60);
                const hours = Math.floor((duration / (60 * 60)) % 24);
                await message.reply(`_Runtime: ${hours.toString().padStart(2, "0")} hours ${minutes.toString().padStart(2, "0")} minutes ${seconds.toString().padStart(2, "0")} seconds_`);
                break;
            default:
                await message.send('Please choose an option:', { reply_markup: JSON.stringify({ inline_keyboard: [[{ text: 'ping', callback_data: 'ping' }], [{ text: 'runtime', callback_data: 'runtime' }]] }) });
                break;
        }
    } catch (error) {
        await message.reply(`Error in command: ${message.command}\n\n Error: ${error}`);
    }
}

module.exports = {
    command
};
