const { Command } = require("../lib/");

Command({
    pattern: "ping",
    type: "user",
    fromAdmin: false
}, async (message, match) => {
    const start = new Date().getTime();
    const ping = await message.reply("*𝆺𝅥 running 𝆺𝅥*");
    const end = new Date().getTime();
    return await message.reply("*☇ ꜱᴩᷨᴇͦᴇͭᴅ ☁ :* " + (end - start) + " *ᴍꜱ* ");
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
