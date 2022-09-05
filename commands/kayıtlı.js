const Discord = require('discord.js');
  const db = require("croxydb")

  exports.run = async (client, button, args) => {
    if(!button.member.permissions.has("ADMINISTRATOR")) return button.channel.send("Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olman gerekiyor!")


      let role = button.mentions.roles.first();
      if (!role)
        return button.reply("Lütfen bir rol etiketle!").catch(() => {})
     
  
          button.react("✅")

//Lrows
  db.set(`kayıtlı${button.guild.id}`, role.id)
  
  
  
}
exports.conf = {
  aliases: []
};

exports.help = {
  name: "kayıtlı-rol"
};