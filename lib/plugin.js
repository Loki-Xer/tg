const commands = [];


function addCommand(commandInfo, func) {
    commandInfo.function = func;
    if (commandInfo.pattern) {
        commandInfo.pattern = new RegExp(`${commandInfo.pattern}`, "is") || false;
    }
    commandInfo.dontAddCommandList = commandInfo.dontAddCommandList || false;
    commandInfo.fromMe = commandInfo.fromMe || false;
    commandInfo.type = commandInfo.type || "misc";

    commands.push(commandInfo);
    return commandInfo;
}

module.exports = {
    addCommand,
    commands
};
