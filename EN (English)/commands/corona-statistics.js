// Required NPM modules: "discord.js" and "node-fetch".

const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
  let countries = args.join(" ");
  const noArgs = new Discord.MessageEmbed()
    .setTitle("Wrong use!")
    .setColor(0xff0000)
    .setDescription(":x: You must enter the country name or abbreviation.")
    .addField(
      `All word: **word**
You can use country name, iso2 and iso3 abbreviations to learn the statistics of the countries. Use English.
Click to view the list: https://github.com/EnesKeremAYDIN/veri/blob/main/veri/ulke-adlari-ve-kisaltmalari-iso2-iso3.md#i̇ngilizce
`
    )
    .setTimestamp();
  if (!args[0]) return message.inlineReply(noArgs);
  if (args[0] === "word") {
    fetch(`https://covid19.mathdro.id/api`)
      .then(response => response.json())
      .then(data => {
        let confirmed = data.confirmed.value.toLocaleString();
        let recovered = data.recovered.value.toLocaleString();
        let deaths = data.deaths.value.toLocaleString();

        const embed = new Discord.MessageEmbed()
          .setTitle(`🌎 World Wide`)
          .addField(":sneeze: Number of cases:", confirmed)
          .addField(
            ":mask: The number of people who have recovered:",
            recovered
          )
          .addField(":skull: Number of deaths:", deaths);

        message.inlineReply(embed);
      });
  } else {
    fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
      .then(response => response.json())
      .then(data => {
        let confirmed = data.confirmed.value.toLocaleString();
        let recovered = data.recovered.value.toLocaleString();
        let deaths = data.deaths.value.toLocaleString();

        const embed = new Discord.MessageEmbed()
          .setTitle(`COVID-19 Durumu  **${countries}**`)
          .addField(":sneeze: Number of cases:", confirmed)
          .addField(
            ":mask: The number of people who have recovered:",
            recovered
          )
          .addField(":skull: Number of deaths:", deaths);

        message.inlineReply(embed);
      })
      .catch(e => {
        return message.inlineReply(
          ":x: Incorrect country name or abbreviation."
        );
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["corona-statistics", "covid-19", "covid", "covid19"],
  permLevel: 0
};

exports.help = {
  name: "corona"
};
