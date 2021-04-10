require("./keepAlive");
const Discord = require("discord.js");
const client = new Discord.Client({ disableMentions: "everyone" });
var bot = new Discord.Client();

https: client.conf = {
  token: "BOT_TOKEN", //Bot'un tokeni.
  pref: "BOT_PREFİX", //Bot'un prefixi.
  own: "BOT_SAHİBİ", //Bot'un sahibinin Discord ID'si. | ID nasıl alınır?: https://support.discord.com/hc/tr/articles/206346498-Kullanıcı-Sunucu-Mesaj-ID-sini-Nerden-Bulurum-
  oynuyor: "BOT_OYNUYOR", //Bot'un oynuyor kısmı.
  durum: "BOT_DURUM" //Bot'un durumu. | "online": çevrimiçi, "offline": çevrimdışı, "idle": boşta, "dnd": rahatsız etmeyin.
};

client.on("message", message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(client.conf.pref)) return;
  let command = message.content.split(" ")[0].slice(client.conf.pref.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.yetkiler(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
});

client.on("ready", () => {
  console.log(`Komutlar yüklendi, bot başlatılıyor.`);
  console.log(
    `${client.user.username} ismi ile Discord hesabı aktifleştirildi!`
  );
  client.user.setStatus(client.conf.durum);
  let mob;
  if (client.conf.durum == "online") mob = "Çevrimiçi";
  if (client.conf.durum == "offline") mob = "Çevrimdışı";
  if (client.conf.durum == "idle") mob = "Boşta";
  if (client.conf.durum == "dnd") mob = "Rahatsız Etmeyin";
  console.log(`Durum ayarlandı: ${mob}!`);
  client.user.setActivity(client.conf.oynuyor);
  console.log(`Oynuyor ayarlandı!`);
});

const fs = require("fs");

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} adet komut yüklenmeye hazır. Komutlar yükleniyor.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Komut yükleniyor: ${props.help.name}'.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

//Komutları kimlerin kullanabileceğinin yani perm yetkilerinin kodları:

client.yetkiler = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0; // Yetkisiz (herkes).
  if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1; // Sunucuda "mesajları yönet" yetkisine sahip herkes.
  if (message.member.hasPermission("MANAGE_ROLES")) permlvl = 2; // Sunucuda "Rolleri yönet" yetkisine sahip herkes.
  if (message.member.hasPermission("MANAGE_CHANNELS")) permlvl = 3; // Sunucuda "Kanalları yönet" yetkisine sahip herkes.
  if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 4; // Sunucuda "Kullanıcı at" yetkisine sahip herkes.
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 5; // Sunucuda "Kullanıcı banla" yetkisine sahip herkes.
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 6; // Sunucuda "Admin" yetkisine sahip herkes.
  if (message.author.id === message.guild.ownerID) permlvl = 7; // Sunucuda "Kurucu" yetkisine sahip herkes.
  if (message.author.id === client.conf.own) permlvl = 8; // Bot sahibi.
  return permlvl;
};

client.login(client.conf.token);
