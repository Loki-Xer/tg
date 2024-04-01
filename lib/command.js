const { installPackage, enc, beautify } = require("./function");

async function command(message) {
    switch (message.command) {
        case "install":
            const pkg = await installPackage(message.match);
            await message.reply(pkg);
            break;
        case ">":
            let m = message;
            let code = message.text.replace(">", "");
            let evaled = await eval(`(async () => { ${code} })()`);
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            await message.reply(evaled);
            break;
        case "enc":
            const Enc = await enc(message.match);
            await message.reply(Enc.message);
            break;
        case "beautify":
            const Beautify = await beautify(message.match);
            await message.reply(Beautify.message);
            break;
        case "ping":
            const start = new Date().getTime();
            await message.reply("```Ping!```");
            const end = new Date().getTime();
            await message.reply("*Pong!*\n ```" + (end - start) + "``` *ms*");
            break;
        case "runtime":
            const duration = process.uptime();
            const seconds = Math.floor(duration % 60);
            const minutes = Math.floor((duration / 60) % 60);
            const hours = Math.floor((duration / (60 * 60)) % 24);
            await message.reply(`_*Runtime: ${hours.toString().padStart(2, "0")} hours ${minutes.toString().padStart(2, "0")} minutes ${seconds.toString().padStart(2, "0")} seconds*_`);
            break;
        default:
            await message.send('Please choose an option:', { reply_markup: JSON.stringify({ inline_keyboard: [[{ text: 'ping', callback_data: 'ping' }], [{ text: 'runtime', callback_data: 'runtime' }]] }) });
            break;
    }
}

module.exports = {
    command
};
