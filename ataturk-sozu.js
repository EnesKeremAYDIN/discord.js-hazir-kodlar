//Gerekli modüller: ataturk-sozu
const ataturkSozu = require("ataturk-sozu");

exports.run = async (client, message) => {
message.channel.send(ataturkSozu());
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ataturk-sozu"],
  permLevel: 0
};

exports.help = {
  name: "atatürk-sözü"
};
