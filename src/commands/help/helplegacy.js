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
      .setName("setup-legacyhelp")
      .setDescription("Aggiunge l'aiuto per il legacy"),
    async execute(interaction, client) {
     

              
        
          const button = new ButtonBuilder()
               .setCustomId('button')
               .setLabel('Legacy Help')
               .setStyle(ButtonStyle.Primary)
         
          await interaction.reply({
            content: "Vuoi ricevere aiuto sull ricompense legacy? Clicca questo bottone!",
            components: [new ActionRowBuilder().addComponents(button)]
          })

          

          //Creare un collector per i bottoni e mostrare il modal
          const collector = interaction.channel.createMessageComponentCollector();
    
          collector.on('collect', async i => {
            await i.showModal(modal);  
            
        
            
                })


                 
                

            

              }}

        
        

              
            
        
        
          
          
        
          
        
              
            
        

      
        
        
        
        
        
        
    
    
      

      
  
      
  
     
    
  
  