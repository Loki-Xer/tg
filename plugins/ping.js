const { Command } = require("../lib/");

Command({
	pattern: "ping",
	type: "user",
	fromAdmin: true
}, async (message, match) => {
	const start = new Date().getTime();
	const ping = await message.reply("*𝆺𝅥 running 𝆺𝅥*");
	const end = new Date().getTime();
	return await message.reply("*☇ ꜱᴩᷨᴇͦᴇͭᴅ ☁ :* " + (end - start) + " *ᴍꜱ* ");
});
