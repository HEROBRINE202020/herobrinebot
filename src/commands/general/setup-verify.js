const {EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, MembershipScreeningFieldType, userMention, User} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setup-verify')
    .setDescription('Crea una verifica per i membri')
    .addChannelOption(option =>
        option.setName('channel')
        .setDescription('Il canale in cui c\'è la verifica')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const verifyEmbed = new EmbedBuilder()
        .setTitle("Verificazione")
        .setDescription('Clicca il bottone per essere verificato NON-BOT')
        .setColor(0x5fb041)
        let sendChannel = channel.send({
            embeds: ([verifyEmbed]),
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('verify').setLabel('Verifica').setStyle(ButtonStyle.Success),
                ),
            ],
        });
       



        if (!sendChannel) {
            return interaction.reply({content: 'C\'è stato un errore! Riprova più tardi...', ephemeral: true});
        } else {
            return interaction.reply({content: 'Il canale di verifica è stato settato', ephemeral: true});
        }

        

      
    }
};