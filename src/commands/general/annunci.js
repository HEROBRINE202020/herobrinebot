const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("annunci")
    .setDescription("Il bot annuncia un update")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) => 
      option
        .setName("annuncio")
        .setDescription("Scrivi l'annuncio")
        .setRequired(true)
    ),

    async execute(interaction, client) {
        let annuncio = interaction.options.getString("annuncio");
        interaction.guild.channels.cache.get('980391576054427659').send(`${annuncio}`);
        }
    }
