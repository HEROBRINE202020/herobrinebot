require("dotenv").config();
const { token, databaseToken } = process.env;
const { connect } = require('mongoose');
const { Client, Collection, GatewayIntentBits, PermissionsBitField, MessageManager, Embed, Events } = require("discord.js");
const Discord = require('discord.js');
const Partials = require('discord.js');
const fs = require("fs");
const interactionCreate = require("./events/client/interactionCreate");
const welcome = require('./../Models/Welcome')
const {DisTube} = require('distube');
const {SpotifyPlugin} = require('@distube/spotify');


const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.selectMenus = new Collection();
client.commandArray = [];
client.distube = new DisTube(client, {
  leaveOnStop: true,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()]
    
    });
module.exports = client;


const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles) 
      require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
(async () => {
  await connect(databaseToken).catch(console.error);
})();

welcome(client);







client.on(Events.InteractionCreate, async interaction => {

  

  if (!interaction.isModalSubmit()) return;
	if (interaction.customId === 'helplegacy') {
    const codeInput = interaction.fields.getTextInputValue('codeInput')
  const issueInput = interaction.fields.getTextInputValue('issueInput')
  
		await interaction.reply({ 
      content: 'La tua richiesta di assistenza è stata inviata con successo. Se il codice Legacy è giusto ti verranno fixati i problemi.',
      ephemeral: true
        
    });

    
  }

  if (!interaction.isModalSubmit()) return;
	if (interaction.customId === 'suggerimenti') {
    const codeInput = interaction.fields.getTextInputValue('suggerimento')
  const issueInput = interaction.fields.getTextInputValue('cosanepensi')
  
		await interaction.reply({ 
      content: 'Il tuo form è stato inviato con successo! Grazie per aver suggerito! :)',
      ephemeral: true
        
    });
}
})

client.on("messageCreate", message => {
  if (message.channel.type == "DM") return

  if (message.member.roles.cache.has("idRuolo1") || message.member.roles.cache.has("idRuolo2")) return

  let parolacce = ["porcodio", "porco dio", "cazzo", "minchia", "minchione", "anticappato", "muori", "frocio", "mussolini", "cazzi", "sesso", "merda"]
  let trovata = false;
  let testo = message.content;

  parolacce.forEach(parola => {
      if (message.content.toLowerCase().includes(parola.toLowerCase())) {
          trovata = true;
          testo = testo.replace(eval(`/${parola}/g`), "###");
      }
  })

  if (trovata) {
      message.delete();
      let embed = new Discord.EmbedBuilder()
          .setTitle("Hai detto una parolaccia")
          .setDescription("Hai scritto un messaggio con parole bloccate\nIl tuo messaggio: " + testo)

      message.channel.send({ embeds: [embed] })
  }
});












    










  
   
  
  
	





