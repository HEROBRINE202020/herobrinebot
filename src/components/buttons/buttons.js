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
        name: `button`
    },
    async execute (interaction, client) {
        const modal = new ModalBuilder()
        .setCustomId('helplegacy')
        .setTitle('ASSISTENZA RICOMPENSA LEGACY FORM');
    
      // Add components to modal
    
      // Create the text input components
      const codeInput = new TextInputBuilder()
        .setCustomId('codeInput')
          // The label is the prompt the user sees for this input
        .setLabel("Qual'è il tuo codice legacy?")
          // Short means only a single line of text
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    
      const issueInput = new TextInputBuilder()
        .setCustomId('issueInput')
        .setLabel("Quale errore riscontri?")
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
            if (interaction.customId === 'helplegacy') {
              const codeInputs = interaction.fields.getTextInputValue('codeInput')
            const issueInputs = interaction.fields.getTextInputValue('issueInput')
            interaction.guild.channels.cache.get('1049381019612094535').send(`Un nuovo utente ha chiesto assistenza legacy: ${interaction.user.tag}.
          Problema: ${issueInputs}
          Codice: ${codeInputs}
          `)

            }})
    }
}