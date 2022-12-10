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
    CommandInteraction,
    userMention
  } = require("discord.js");
  const InteractionCreate = require('../../events/client/interactionCreate');
const button = require("./button");




module.exports = {
    data: {
        name: `verify`
    },
    async execute (interaction, client) {
        if (interaction.isButton()) {
            const role = interaction.guild.roles.cache.get('986642330905903185')
            const roleDelete = interaction.guild.roles.cache.get('986644957538430976')


            await interaction.member.roles.remove(roleDelete)
            await interaction.member.roles.add(role).then((member) => interaction.reply({
              content: `${role} ti è stato assegnato.`,
              ephemeral: true
            }))
          }
    }
}







