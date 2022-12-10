const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const warningSchema = require("../../../Models/Warning");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("warning")
      .setDescription("Avvisare un utente")
      .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
      .addSubcommand(subcommand => 
        subcommand
          .setName("aggiungere")
          .setDescription("Aggiunge un warn a un utente")
            .addUserOption(option => option
                .setName("utente")
                .setDescription("L'utente da warnare")
                .setRequired(true)
            )
            .addStringOption(option => option
               .setName("ragione")
               .setDescription("La ragione del warn")  
               .setRequired(false)
            )
            .addStringOption(option => option
                .setName("evidenzia")
                .setDescription("Aggiungi una evidenza")  
                .setRequired(false)
             )
                )
          
          .addSubcommand(subcommand => 
            subcommand
              .setName("controllare")
              .setDescription("Controlla quanti warn ha un utente")
              .addUserOption(option => option
                .setName("utente")
                .setDescription("Specifica l'utente")
                .setRequired(true)
                    )
              )
              .addSubcommand(subcommand => 
                subcommand
                  .setName("togliere")
                  .setDescription("Rimuove un warn specifico da un utente")
                  .addUserOption(option => option
                    .setName("utente")
                    .setDescription("Specifica l'utente")
                    .setRequired(true)
                  )
                  .addIntegerOption(option => option
                    .setName("id")
                    .setDescription("Inserisci l'id del warn da togliere")  
                    .setRequired(false)
                 )
                        
                  )
                  .addSubcommand(subcommand => 
                    subcommand
                      .setName("clear")
                      .setDescription("Toglie tutti i warn da un utente")
                     
                        .addUserOption(option => option
                            .setName("utente")
                            .setDescription("Specifica l'utente")
                            .setRequired(true)
                    )
                            ),
                      
            async execute(interaction) {
                const {options, guildId, user, member} = interaction;
                const sub = options.getSubcommand(["aggiungere", "controllare", "togliere", "clear"]);
                const target = options.getUser("utente");
                const reason = options.getString("ragione") || "Nessuna ragione fornita";
                const evidence = options.getString("evidenzia") || "Nessuna evidenza fornita";
                const warnId = options.getInteger("id") - 1;
                const warnDate = new Date(interaction.createdTimestamp).toLocaleDateString();

                const userTag = `${target.username}#${target.discriminator}`;

                const embed = new EmbedBuilder();

                switch (sub) {
                    case "add":
                        warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                            if (err) throw err;

                            if (!data) {
                                data = new warningSchema({
                                    GuildID: guildId,
                                    UserID: target.id,
                                    UserTag: userTag,
                                    Content: [
                                        {
                                            ExecuterId: user.id,
                                            ExecuterTag: user.tag,
                                            Reason: reason,
                                            Evidence: evidence,
                                            Date: warnDate
                                        }
                                    ]
                                })
                            } else {
                                const warnContent = {
                                    ExecuterId: user.id,
                                    ExecuterTag: user.tag,
                                    Reason: reason,
                                    Evidence: evidence,
                                    Date: warnDate
                                }
                                data.Content.push(warnContent);
                            }
                            data.save();
                        });

                        embed.setColor("Green")
                        .setDescription(`
                        Warn aggiunto a: ${userTag} | ||${target.id}||
                        **Ragione**: ${reason}
                        **Evidenza**: ${evidence}
                        `)
                        .setFooter({text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true })})
                        .setTimestamp();

                    interaction.reply({ embeds: [embed] });
                       break;
                    case "check":
                        warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                            if (err) throw err;

                            if (data) {
                                embed.setColor("Green")
                                .setDescription(`${data.Content.map(
                                    (w, i) =>
                                    `**ID**: ${i + 1}
                                     **Da**: ${w.ExecuterTag}
                                     **Data**: ${w.Date}
                                     **Ragione**: ${w.Reason}
                                     **Evidenza**: ${w.Evidence}\n\n
                                     `
                                ).join(" ")}`)
                                .setFooter({text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true })})
                                .setTimestamp();

                                interaction.reply({ embeds: [embed] });
                            } else {
                                embed.setColor("Red")
                                .setDescription(`${userTag} | ||${target.id}|| non ha warn`)
                                .setFooter({text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true })})
                                .setTimestamp();
                             
                                interaction.reply({ embeds: [embed] });
                            }
                        });
                            
                     
                       break;
                    case "remove":
                        warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                            if (err) throw err;

                            if (data) {
                                data.Content.splice(warnId, 1);
                                data.save();




                                embed.setColor("Green")
                                .setDescription(`${userTag} warn id: ${warnId + 1} è stato rimosso`)
                                .setFooter({text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true })})
                                .setTimestamp();
                             
                                interaction.reply({ embeds: [embed] });

                            } else {
                                embed.setColor("Red")
                                .setDescription(`${userTag} | ||${target.id}|| non ha warn`)
                                .setFooter({text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true })})
                                .setTimestamp();
                             
                                interaction.reply({ embeds: [embed] });
                            }
                        });
                       break;
                    case "clear":
                        warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                            if (err) throw err;

                            if (data) {
                                await warningSchema.findOneAndDelete({GuildID: guildId, UserID: target.id, UserTag: userTag});





                                embed.setColor("Green")
                                .setDescription(` I warn di ${userTag} sono stati rimossi. | ||${target.id}|| `)
                                .setFooter({text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true })})
                                .setTimestamp();
                             
                                interaction.reply({ embeds: [embed] });

                            } else {
                                embed.setColor("Red")
                                .setDescription(`${userTag} | ||${target.id}|| non ha warn`)
                                .setFooter({text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true })})
                                .setTimestamp();
                             
                                interaction.reply({ embeds: [embed] });
                            }
                        });
                       break;
                }
            } 
}