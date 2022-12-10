
const {
  Client,
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits
} = require("discord.js");
const { openticket } = require("../../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Crea un messaggio ticket")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const { guild } = interaction;

    const embed = new EmbedBuilder().setDescription(
      "Ricevi assistenza da un membro dello staff"
    );

    const button = new ActionRowBuilder().setComponents(
        new ButtonBuilder().setCustomId("member").setLabel("Segnala un utente").setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId("bug").setLabel("Segnala un bug").setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("legacy").setLabel("Legacy").setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId("other").setLabel("Altro").setStyle(ButtonStyle.Success)
    )

    await guild.channels.cache.get(openticket).send({
        embeds: [embed],
        components: [
            button
        ]
    })

    interaction.reply({
        content: "Il messaggio del ticket è stato inviato",
        ephemeral: true
    })
  }
};
