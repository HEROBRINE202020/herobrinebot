const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Espelle il membro specificato")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMembers)
    .addUserOption((option) =>
      option
        .setName("membro")
        .setDescription("Il membro che vuoi espellere")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
      .setName("ragione")
      .setDescription("La ragione per il kick")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("membro");
    let ragione = interaction.options.getString("ragione");
    const member = await interaction.guild.members
      .fetch(user.id)
      
    if (!ragione) ragione = "Nessuna ragione fornita";
    

    await member.kick(ragione).catch(console.error);

    await interaction.reply({
        content: `Espulso ${user.tag} dal server!`
    });

  },
};
