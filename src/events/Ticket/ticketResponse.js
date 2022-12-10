const { ChannelType, ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const ticketSchema = require('../../../Models/Ticket');
const { ticketParent, everyone } = require('../../../config.json');

module.exports = {
    name: "interactionCreate",

    async execute(interaction) {
        const {guild, member, customId, channel} = interaction;
        const {WiewChannel, SendMessages, ManageChannels, ReadMessageHistory} = PermissionFlagsBits;
        const ticketId = Math.floor(Math.random() * 9000) + 10000;

        if(interaction.isButton()) return;

        if(!["member", "bug", "legacy", "other"].includes(customId)) return;

        if(!guild.members.me.permissions.has(ManageChannels))
           interaction.reply({
            content: "Non ho i permessi per questo",
            ephemeral: true
           })
        try {
           await guild.channels.create({
            name: `${member.user.id}-ticket${ticketId}`,
            type: ChannelType.GuildText,
            parent: ticketParent,
            permissionOverWrites: [
                {
                    id: everyone,
                    deny: [WiewChannel, SendMessages, ReadMessageHistory],
                },
                {
                    id: member.id,
                    allow: [WiewChannel, SendMessages, ReadMessageHistory],
                },
            ],
           }).then(async (channel) => {
            const newTicketSchema = await ticketSchema.create({
                GuildID: guild.id,
                MemberID: member.id,
                TicketID: ticketId,
                ChannelID: channel.id,
                Closed: false,
                Locked: false,
                Type: customId,
            });

            const embed = new EmbedBuilder()
            .setTitle(`${guild.name} - Ticket: ${customId}`)
            .setDescription(`Lo staff ti contatterà presto, descrivi il tuo problema`)
            .setFooter({ text: `${ticketId}`, iconURL: member.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

            const button = new ActionRowBuilder().setComponents(
                new ButtonBuilder().setCustomId("close").setLabel('Chiudere il ticket').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId("lock").setLabel('Blocca il ticket').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("unlock").setLabel('Sblocca il ticket').setStyle(ButtonStyle.Success),
            );

            channel.send({
                embeds: ([embed]),
                components: [
                   button
                ]
            });

            interaction.reply({
                content: "Creato con successo un ticket",
                ephemeral: true
            })

           })
        } catch (err) {
            return console.log(err);
        }
    }
}