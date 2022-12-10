const { InteractionType } = require('discord.js');

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Si è verificato un errore durante l'esecuzione di questo comando...`,
          ephemeral: true,
        });
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customId } = interaction;
      const modal = modals.get(customId);
      if (!modal) return new Error("Non c'è nessun codice per questo modal")

      try {
        await modal.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId)
      if (!button) return new Error("Non c'è nessun codice per questo bottone");

      try {
        await button.execute(interaction, client)
      } catch (err) {
        console.error(err)
        
      }
    }
    }
  }

