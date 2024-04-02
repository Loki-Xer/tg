let commands = [];

function Command(info, func) {
  let infos = {
    type: info["type"] || "others",
    fromAdmin: info["fromAdmin"] || false,
    dontAddCommandList: info["dontAddCommandList"] || false,
    function: func
  };
  if (!info.pattern) {
    infos.dontAddCommandList = true;
  } else {
    infos.pattern = info.pattern || [];
  }
  commands.push(infos);
  return infos;
}

module.exports = { Command, commands };
