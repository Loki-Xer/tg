const { Command } = require("../lib/");

Command({
    on: "all",
    pattern: "hy"
}, async (message, match) => {
    if (message.text.startsWith(">")) {
        let m = message;
        const code = message.text.slice(1).trim();
        try {
            let evaled = await eval(code);
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            return await message.send(evaled);
        } catch (error) {
            return await message.send(`Error executing code: ${error.message}`);
        }
    }
});
