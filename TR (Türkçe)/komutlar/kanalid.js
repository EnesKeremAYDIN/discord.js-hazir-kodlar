const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setAuthor("Kanal ID", client.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`️[Bu](https://discord.com/channels/${message.guild.id}/${message.channel.id}) (<#${message.channel.id}>) kanalın ID'si: **${message.channel.id}**.`)
    .setColor("RANDOM")
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
    .setFooter("Bu komut " + message.author.tag,message.author.avatarURL({ dynamic: true })) + " tarafından kullanıldı.";
	message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "kanalid"
};
