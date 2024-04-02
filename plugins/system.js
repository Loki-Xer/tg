const { Command } = require("../lib/");

Command({
    pattern: "ping",
    type: "user",
    fromAdmin: true
}, async (message, match) => {
    const start = new Date().getTime();
    const ping = await message.reply("*Ping!*");
    const end = new Date().getTime();
    await message.send("*Pong!*\n" + (end - start) + " ms", { type: "edit", chat_id: message.jid, message_id: ping.message_id, parse_mode: "Markdown" });
});


Command({
    pattern: "runtime",
    type: "user",
    fromAdmin: true
}, async (message, match) => {
    const duration = process.uptime();
    const seconds = Math.floor(duration % 60);
    const minutes = Math.floor((duration / 60) % 60);
    const hours = Math.floor((duration / (60 * 60)) % 24);
    await message.reply(`_Runtime: ${hours.toString().padStart(2, "0")} hours ${minutes.toString().padStart(2, "0")} minutes ${seconds.toString().padStart(2, "0")} seconds_`);
});              

Command({
     pattern: "jid",
     type: "user",
     fromAdmin: false
}, async (message, match) => {
     await message.reply(message.jid.toString());
});
