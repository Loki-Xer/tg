const { installPackage, enc, beautify, sleep } = require("./function");

async function command(message, client) {
    switch (message.command) {
        case "install":
            const pkg = await installPackage(message.match);
            await message.reply(pkg);
            break;
        case "jid":
            await message.reply(message.jid);
            break;
        case ">":
            if (!message.admin) return message.send("https://graph.org/file/03840e96fc285d17251a7.jpg", { type: "photo", caption: "myr 😂 ni ara loki allalo" })
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
            const ping = await message.send("<b>Ping!</b>", { parse_mode: "HTML" });
            const end = new Date().getTime();
            await message.client.editMessageText("<b>Pong!</b>\n" + (end - start) + " ms", { chat_id: message.chat.id, message_id: ping.message_id, parse_mode: "HTML" });
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
