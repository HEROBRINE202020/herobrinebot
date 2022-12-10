const { ButtonInteraction, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const {createTranscript} = require('discord-html-transcripts');
const {transcripts} = require('../../../config.json');
const ticketSchema = require('../../../Models/Ticket');


module.exports = {
    name: "interactionCreate",

    async execute(interaction) {
        const {guild, member, customId, channel} = interaction;
        const { ManageChannels, SendMessages } = PermissionFlagsBits;


        if(interaction.isButton()) return;

        if(!["close", "lock", "unlock"].includes(customId)) return;

        if(!guild.members.me.permission.has(ManageChannels))
           return interaction.reply({
            content: "Non ho i permessi per questo",
            ephemeral: true
           })
        const embed = new EmbedBuilder().setColor("Aqua");

        ticketSchema.findOne({ChannelID: channel.id}, async (err, data) => {
            if(err) throw err;
            if(!data) return;

            const fetchedMember = await guild.members.cache.get(data.MemberID);

            switch (customId) {
                case "close":
                    if(data.closed == true)
                      return interaction.reply({ content: "Il ticket sta già venendo eliminato...", ephemeral: true })
                    
                    const transcript = await createTranscript(channel, {
                        limit: -1,
                        returnBuffer: false,
                        filename: `${member.user.id}-ticket${data.Type}-${data.TicketID}.html`,
                    });

                    await ticketSchema.updateOne({channelID: channel.id}, {Closed: true});

                    const transcriptEmbed = new EmbedBuilder()
                        .setTitle(`Tipo di Transcript: ${data.Type}\nId: ${data.TicketID}`)
                        .setFooter({text: member.user.tag, iconURL: member.displayAvatarURL({dynamic: true})})
                        .setTimestamp();

                    const transcriptProcesss = new EmbedBuilder()
                       .setTitle('Salvando il transcript...')
                       .setDescription('Il ticket verrà chiuso tra 10 secondi, abilita i dm per il transcript del ticket')
                       .setColor("Red")
                       .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({dynamic: true}) })
                       .setTimestamp();

                    const res = await guild.channels.cache.get(transcripts).send({
                        embeds: [transcriptEmbed],
                        files: [transcript],

                    });

                    channel.send({ embeds: [transcriptProcesss] });

                    setTimeout(function () {
                        member.send({
                            embeds: [transcriptEmbed.setDescription(`Accedi al ticket transcript: ${res.url}`)]
                        }).catch(() => channel.send('Non posso mandare il transcript nei dm'));
                        channel.delete();
                    }, 10000);

                    break;

                    case "lock":
                        if(!member.permission.has(ManageChannels))
                           return interaction.reply({
                            content: "Non hai i permessi per questo",
                            ephemeral: true
                           });

                        if(data.Locked == true)
                          return interaction.reply({
                            content: "Il ticket è già settato su bloccato",
                            ephemeral: true
                          })
                        
                        await ticketSchema.updateOne({ChannelID: channel.id}, {Locked: true});
                        embed.setDescription("Il ticket è stato bloccato con successo");

                        channel.permissionOverwrites.create(fetchedMember, {SendMessages: false});

                        return interaction.reply({
                            embeds: [embed]
                        });
                        case "unlock":
                            if(!member.permission.has(ManageChannels))
                               return interaction.reply({
                                content: "Non hai i permessi per questo",
                                ephemeral: true
                               });
    
                            if(data.Locked == false)
                              return interaction.reply({
                                content: "Il ticket è già settato su sbloccato",
                                ephemeral: true
                              })
                            
                            await ticketSchema.updateOne({ChannelID: channel.id}, {Locked: false});
                            embed.setDescription("Il ticket è stato sbloccato con successo");
    
                            channel.permissionOverwrites.create(fetchedMember, {SendMessages: true});
    
                            return interaction.reply({
                                embeds: [embed]
                            });
            }     
        })

    }
}

