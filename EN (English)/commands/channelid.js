const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setAuthor("Channel ID", client.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`️ID of [this](https://discord.com/channels/${message.guild.id}/${message.channel.id}) (<#${message.channel.id}>) channel: **${message.channel.id}**.`)
    .setColor("RANDOM")
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
    .setFooter("This command has been requested by " + message.author.tag,message.author.avatarURL({ dynamic: true }));
	message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "channelId"
};
