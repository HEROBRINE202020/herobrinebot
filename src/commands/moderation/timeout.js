const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout al membro specificato")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMembers)
    .addUserOption((option) =>
      option
        .setName("membro")
        .setDescription("Il membro che vuoi timeout")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("tempo").setDescription("Quanto tempo rimarrà il timeout")
      .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("ragione").setDescription("La ragione per il timeout")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("membro");
    let ragione = interaction.options.getString("ragione");
    const tempo = interaction.options.getInteger("tempo");
    const member = await interaction.guild.members.fetch(user.id);

    if (!ragione) ragione = "Nessuna ragione fornita";

    await member.timeout(tempo * 60 * 1000, ragione).catch(console.error);

    await interaction.reply({
      content: `Timeout ${user.tag} con successo!`,
    });
  },
};
