const Discord = require("discord.js");
const client = new Discord.Client();
var WAValidator = require("wallet-address-validator");

exports.run = async (client, message, args) => {
  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("For which coin do you want to make a wallet query?")
        .setDescription(`Auroracoin/AUR: **auroracoin** or **AUR**
Bankex/BKX: **bankex** or **BKX**
BeaverCoin/BVC: **beavercoin** or **BVC**
Biocoin/BIO: **biocoin** or **BIO**
Bitcoin/BTC: **bitcoin** or **BTC**
BitcoinCash/BCH: **bitcoincash** or **BCH**
BitcoinGold/BTG: **bitcoingold** or **BTG**
BitcoinPrivate/BTCP: **bitcoinprivate** or **BTCP**
BitcoinZ/BTCZ: **bitcoinz** or **BTCZ**
Callisto/CLO: **callisto** or **CLO**
Dash: **dash** or **DASH**
Decred/DCR: **decred** or **DCR**
Digibyte/DGB: **digibyte** or **DGB**
Dogecoin/DOGE: **dogecoin** or **DOGE**
Ethereum/ETH: **ethereum** or **ETH**
EthereumClassic/ETH: **ethereumclassic** or **ETC**
EthereumZero/ETZ: **etherzero** or **ETZ**
Freicoin/FRC: **freicoin** or **FRC**
Garlicoin/GRLC: **garlicoin** or **GRLC**
Hush/HUSH: **hush** or **HUSH**
Komodo/KMD: **komodo** or **KMD**
Litecoin/LTC: **litecoin** or **LTC**
Megacoin/MEC: **megacoin** or **MEC**
Monero/XMR: **monero** or **XMR**
Namecoin/NMC: **namecoin** or **NMC**
Nano/NANO: **nano** or **NANO**
NEO/NEO: **NEO** or **NEO**
NeoGas/GAS: **neogas** or **GAS**
Peercoin/PPCoin/PPC: **peercoin** or **PPC**
Primecoin/XPM: **primecoin** or **XPM**
Protoshares/PTS: **protoshares** or **PTS**
Qtum/QTUM: **qtum** or **QTUM**
Raiblocks/XRB: **raiblocks** or **XRB**
Ripple/XRP: **ripple** or **XRP**
Snowgem/SNG: **snowgem** or **SNG**
Vertcoin/VTC: **vertcoin** or **VTC**
Votecoin/VTC: **votecoin** or **VOT**
Zcash/ZEC: **zcash** or **ZEC**
Zclassic/ZCL: **zclassic** or **ZCL**
ZenCash/ZEN: **zencash** or **ZEN**
`)
        .setColor("#FFC301")
    );
  let coin = args[0];
  let wallet = args[1];
  if (message.author.bot) return;
  var valid = WAValidator.validate(wallet, coin);
  if (valid == true) {
    message.reply("**" + wallet + "** is a valid **" + coin + "** address.");
  } else {
    message.reply(
      "**" + wallet + "** is not a valid **" + coin + "** address."
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "wallet-query"
};
