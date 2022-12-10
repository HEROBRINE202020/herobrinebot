const Guild = require("../../../Models/guild");
const { SlashCommandBuilder } = require("discord.js");
const mongoose = require("mongoose");
const guild = require("../../../Models/guild");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("database")
    .setDescription("Da informazioni sul database"),
  async execute(interaction, client) {
    let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
    if (!guildProfile) {
      guildProfile = await new Guild({
        _id: mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        guildName: interaction.guild.name,
        guildIcon: interaction.guild.iconURL()
          ? interaction.guild.iconURL()
          : "None.",
      });

      await guildProfile.save().catch(console.error);
      await interaction.reply({
        content: `Nome del server: ${guildProfile.guildName}`,
        ephemeral: true,
      });
      console.log(guildProfile);
    } else {
      await interaction.reply({
        content: `Server ID: ${guildProfile.guildId}`
      });
      console.log(guildProfile);

    }
  },
};
