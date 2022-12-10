const {
    SlashCommandBuilder,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
    ButtonBuilder,
    ButtonStyle,
    PermissionsBitField,
    PermissionFlagsBits,
    Events,
    CommandInteraction
  } = require("discord.js");
  const interactionCreate = require("../../events/client/interactionCreate");
  
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("setup-suggerimenti")
      .setDescription("Setta un canale per i suggerimenti"),
    async execute(interaction, client) {
     

              
        
          const button = new ButtonBuilder()
               .setCustomId('buttons')
               .setLabel('Suggerimenti')
               .setStyle(ButtonStyle.Primary)
         
          await interaction.reply({
            content: "Vuoi suggerire qualcosa per il server? Clicca qui!",
            components: [new ActionRowBuilder().addComponents(button)]
          })

          

          


                 
                

            

              }}
