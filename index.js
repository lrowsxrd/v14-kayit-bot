const {PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const config = require("./config.js");
const db = require("croxydb")
const client = new Client({
  partials: [
    Partials.Message, 
    Partials.Channel, 
    Partials.GuildMember, 
    Partials.Reaction, 
    Partials.GuildScheduledEvent,
    Partials.User, 
    Partials.ThreadMember, 
  ],
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildBans, 
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks, 
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates, 
    GatewayIntentBits.GuildPresences, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions, 
    GatewayIntentBits.GuildMessageTyping, 
    GatewayIntentBits.DirectMessages, 
    GatewayIntentBits.DirectMessageReactions, 
    GatewayIntentBits.DirectMessageTyping, 
    GatewayIntentBits.MessageContent, 
  ],
});

//Lrows
module.exports = client;
//Lrows
require("./events/message.js")
require("./events/ready.js")
//Lrows
client.login(config.token || process.env.TOKEN)
//Lrows
const modal = new ModalBuilder()
.setCustomId('form')
.setTitle('Lro,iws - Kayıt Sistemi!')
  const a1 = new TextInputBuilder()
  .setCustomId('isim')
  .setLabel('İsim')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Arda')
  .setRequired(true)
  const a2 = new TextInputBuilder()
  .setCustomId('yas')
  .setLabel('Yaş')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('15')
  .setRequired(true)
   const row = new ActionRowBuilder().addComponents(a1);
  const row2 = new ActionRowBuilder().addComponents(a2);
  modal.addComponents(row, row2);
client.on('interactionCreate', async (interaction) => {
//Lrows
	if(interaction.customId === "kayıt"){
    await interaction.showModal(modal);
	}//Lrows
 //Lrows
})  
client.on('interactionCreate', async interaction => {//Lrows
  if (interaction.type !== InteractionType.ModalSubmit) return;
  if (interaction.customId === 'form') {
    const isim = interaction.fields.getTextInputValue('isim')
     const yas = interaction.fields.getTextInputValue('yas')
      //Lrows
        let log = db.fetch(`log_${interaction.guild.id}`)
      const embed = new EmbedBuilder()
      .setTitle("Lrows - Kayıt Et!")
      .setDescription(`Kullanıcı: ${interaction.user}\n\nİsim: **${isim}**\n\nYaş: **${yas}**`)
      .setColor("#007fff")
      const row = new ActionRowBuilder()
      .addComponents(
      new ButtonBuilder()
        .setLabel("Kayıt Et!")
        .setStyle(ButtonStyle.Primary)//Lrows
        .setCustomId("kayıtet"),
        new ButtonBuilder()
        .setLabel("Kayıt Etme!")
        .setStyle(ButtonStyle.Danger)
        .setCustomId("kayıtetme"))
      await interaction.reply({content: "Yetkililere formun başarıyla gönderildi.", ephemeral: true})
        client.channels.cache.get(log).send({embeds: [embed], components: [row]}).then(async m => {
     
          db.set(`kullanıcı_${m.id}`, interaction.user.id)
            
            //Lrows
        })
      //Lrows
    
    }//Lrows
  })
    client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
 if (interaction.customId === 'kayıtetme') {
   let message = interaction.message
   message.delete()
   }//Lrows
       if (interaction.customId === 'kayıtet') {
 let message = interaction.message
   message.delete()
         let kullanıcı = db.fetch(`kullanıcı_${interaction.message.id}`)
         let rol = db.fetch(`kayıtlı${interaction.guild.id}`)
        interaction.guild.members.cache.get(kullanıcı).roles.add(rol)
         interaction.reply({content: "Kullanıcı Başarıyla kayıt edildi.", ephemeral: true})
        }  
      });
         //Lrows
