let commands = [];

function Command(info, func) {
  let types = ['photo', 'document', 'sticker', 'animation', 'video', 'text'];
  let infos = {
    type: info["type"] === undefined || undefined ? "others" : info["type"],
    dontAddCommandList: info["dontAddCommandList"] === undefined ? false : info["dontAddCommandList"],
    function: func
  };
  if (info.on === undefined && info.pattern === undefined) {
    infos.on = "message";
    infos.dontAddCommandList = true;
  } else if (info.on !== undefined && types.includes(info.on)) {
    infos.on = info.on;
    if (info.pattern !== undefined) infos.pattern = info.pattern === undefined ? [] : info.pattern;
  } else infos.pattern = info.pattern === undefined ? [] : info.pattern;
  commands.push(infos);
  return infos;
}

module.exports = { Command, commands };
