const { Command, enc, beautify } = require("../lib/");


Command({
     pattern: "enc",
     type: "user",
     fromAdmin: true
}, async (message, match) => {
     if (!message.match) return message.reply("_provide a text_");
     const Enc = await enc(message.match);
     await message.reply(Enc.message);
});

Command({
     pattern: "beautify",
     type: "user",
     fromAdmin: true
}, async (message, match) => {
    if (!message.match) return message.reply("_provide a text_");
    const Beautify = await beautify(message.match);
    await message.reply(Beautify.message);
});
