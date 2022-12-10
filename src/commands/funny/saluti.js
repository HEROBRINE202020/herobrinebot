const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("saluto")
    .setDescription("Saluta un utente specificato")
    .addUserOption((option) =>
      option
        .setName("membro")
        .setDescription("Il membro che vuoi salutare")
        .setRequired(true)
    
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("membro");
    const member = await interaction.guild.members
      .fetch(user.id)
      
    await interaction.reply({
        content: `Saluto a ${user.tag}!`
    });
    

  
  },
};