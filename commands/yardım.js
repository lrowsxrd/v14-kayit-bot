const {EmbedBuilder} = require("discord.js");
const config = require("../config.js")
let prefix = config.prefix
exports.run = async (client, message, args) => {

    const embed = new EmbedBuilder()
    .setTitle("Lrows - Yardım!")
    .setDescription(`${prefix}kayıtlı-rol\n${prefix}kayıt-ol Buton Üzerinde Yazıcak Yazı + Embed Mesaj Yazısı\n${prefix}logs`)
    .setColor("#007fff")
    .setTimestamp()
    return message.channel.send({embeds : [embed]});

};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "yardım"
};//Lrows