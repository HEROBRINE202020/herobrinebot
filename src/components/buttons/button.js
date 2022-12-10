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
  const InteractionCreate = require('../../events/client/interactionCreate')




module.exports = {
    data: {
        name: `buttons`
    },
    async execute (interaction, client) {
        const modal = new ModalBuilder()
        .setCustomId('suggerimenti')
        .setTitle('SUGGERIMENTI PER IL SERVER');
    
      // Add components to modal
    
      // Create the text input components
      const codeInput = new TextInputBuilder()
        .setCustomId('suggerimento')
          // The label is the prompt the user sees for this input
        .setLabel("Cosa consigli di fare nel server?")
          // Short means only a single line of text
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    
      const issueInput = new TextInputBuilder()
        .setCustomId('cosanepensi')
        .setLabel("Cosa ne pensi del server?")
          // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
    
      // An action row only holds one text input,
      // so you need one action row per text input.
      const firstActionRow = new ActionRowBuilder().addComponents(codeInput);
      const secondActionRow = new ActionRowBuilder().addComponents(issueInput);
    
      // Add inputs to the modal
      modal.addComponents(firstActionRow, secondActionRow);
        await interaction.showModal(modal)


        client.on(Events.InteractionCreate, async interaction => {

  

            if (!interaction.isModalSubmit()) return;
            if (interaction.customId === 'suggerimenti') {
              const codeInputs = interaction.fields.getTextInputValue('suggerimento')
            const issueInputs = interaction.fields.getTextInputValue('cosanepensi')
            interaction.guild.channels.cache.get('1050166203764707418').send(`Un nuovo utente ha compilato il form del suggerimenti: ${interaction.user.tag}
          Suggerimento: ${codeInputs}
          Cosa ne pensa del server: ${issueInputs}
          `)

            }})
    }
}