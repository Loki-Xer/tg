const { installPackage, enc, beautify, sleep } = require("./function");

async function command(message) {
    switch (message.command) {
        case "install":
            const pkg = await installPackage(message.match);
            await message.reply(pkg);
            break;
        case "jid":
            await message.reply(message.jid.toString()); // Convert jid to string before replying
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
            const ping = await message.reply("*Ping!*");
            const end = new Date().getTime();
            await message.send("*Pong!*\n" + (end - start) + " ms", { type: "editi", chat_id: message.jid, message_id: ping.message_id, parse_mode: "Markdown" });
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
}

module.exports = {
    command
};
