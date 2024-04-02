const { addCommand } = require("../lib/");

addCommand({
	pattern: "ping",
	type: "user",
}, async (message, match) => {
	const start = new Date().getTime();
	const ping = await message.reply("*𝆺𝅥 running 𝆺𝅥*");
	const end = new Date().getTime();
	return await message.reply("*☇ ꜱᴩᷨᴇͦᴇͭᴅ ☁ :* " + (end - start) + " *ᴍꜱ* ");
});
