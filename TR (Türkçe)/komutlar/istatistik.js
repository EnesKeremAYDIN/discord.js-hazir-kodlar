// Gerekli NPM modülleri: "discord.js", "moment", "moment-duration-format", "os"

const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
var os = require("os");

exports.run = (client, message) => {
  const duration = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
  var usedMemory = os.totalmem() - os.freemem(),
    totalMemory = os.totalmem();
  var getpercentage = ((usedMemory / totalMemory) * 100).toFixed(2) + "%";
  message.author.send(`__**İstatistikler:**__
**Bot adı:** ${client.user.username}
**Bot ID:** ${client.user.id}
**Hafıza kullanımı:** ${(usedMemory / Math.pow(1024, 3)).toFixed(2)} MB
**Disk kullanımı:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
**CPU kullanımı:** %${(process.memoryUsage().heapUsed / 31000 / 31000).toFixed(2)} 
**CPU:** ${os.cpus().map(i => `${i.model}`)[0]}
**Çalışma süresi:** ${duration}
**Aktif sunucu:** ${client.guilds.cache.size}
**Aktif kullanıcı:** ${client.users.cache.size}
**Aktif kanal:** ${client.channels.cache.size}
**Discord.js sürümü:** ${Discord.version}
**Node.js sürümü:** ${process.version}
**Ping:** ${client.ws.ping}
**Komut Sayısı: ** ${client.commands.size}
`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "istatistik"
};
