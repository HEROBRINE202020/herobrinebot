const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Banna un utente specificato")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMembers)
    .addUserOption((option) =>
      option
        .setName("membro")
        .setDescription("Il membro che vuoi bannare")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
      .setName("ragione")
      .setDescription("La ragione per il ban")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("membro");
    let ragione = interaction.options.getString("ragione");
    const member = await interaction.guild.members
      .fetch(user.id)
      
    if (!ragione) ragione = "Nessuna ragione fornita";
    

    await member.ban({
        deleteMessageSeconds: 1,
        reason: ragione,

    }).catch(console.error);

    await interaction.reply({
        content: ` ${user.tag} è stato bannato!`
    });

  },
};
