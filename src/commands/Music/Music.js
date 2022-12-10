const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji } = require('discord.js');
const client = require('../../bot');





module.exports = {
    data: new SlashCommandBuilder()
      .setName('musica')
      .setDescription('Un sistema di musica')
      .addSubcommand(subcommand =>
        subcommand.setName('play')
        .setDescription('Avvia una canzone')
        .addStringOption(option =>
            option.setName('nome')
            .setDescription('Specifica l\'url/nome della canzone/video')
            .setRequired(true)
            )
        )
        .addSubcommand(subcommand =>
          subcommand.setName('volume')
          .setDescription('Imposta il volume della canzone/video')
          .addIntegerOption(option =>
              option.setName('percentuale')
              .setDescription('La percentuale del volume della canzone/video')
              .setRequired(true)
              .setMinValue(1)
              .setMaxValue(100)
              )
          )
          .addSubcommand(subcommand =>
            subcommand.setName('opzioni')
            .setDescription('Modifica le opzioni')
            .addStringOption(option =>
                option.setName('opzioni')
                .setDescription('Modifica le opzioni')
                .setRequired(true)
                .addChoices(
                  {name: "queue", value: "queue"},
                  {name: "skip", value: "skip"},
                  {name: "pause", value: "pause"},
                  {name: "resume", value: "resume"},
                  {name: "stop", value: "stop"}
                )
                )
            ),
            async execute(interaction) {
              const {options, member, guild, channel} = interaction;

              const subcommand = options.getSubcommand();
              const query = options.getString("nome");
              const volume = options.getInteger("percentuale");
              const option = options.getString("opzioni");
              const voiceChannel = member.voice.channel;

              const embed = new EmbedBuilder();

              if(!voiceChannel) {
                embed.setColor("Red").setDescription("Devi essere in un canale vocale per eseguire i comandi di musica");
                return interaction.reply({ embeds: [embed], ephemeral: true })
              }
              if(!member.voice.channelId == guild.members.me.voice.channelId) {
                embed.setColor("Red").setDescription(`Non puoi usare il music player quando è già attivo in <#${guild.members.me.voice.channelId}`);
                return interaction.reply({ embeds: [embed], ephemeral: true })
               
              }

              try {
                switch (subcommand) {
                  case "play":
                    client.distube.play(voiceChannel, query, { textChannel: channel, member: member });
                    return interaction.reply({ content: "🎶Richiesta ricevuta" })
                  case "volume":
                    client.distube.setVolume(voiceChannel, volume);
                    return interaction.reply({ content: `🔊 Il volume è stato settato a ${volume}%` })
                  case "options":
                    const queue = await client.distube.getQueue(voiceChannel);

                    if(!queue) {
                      embed.setColor("Red").setDescription("Non c'è nessuna coda attiva");
                      return interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                      })
                    }

                    switch(option) {
                      case "skip":
                        await queue.skip(voiceChannel);
                        embed.setColor("Blue").setDescription("⏭ La canzone è stata saltata");
                        return interaction.reply({
                          embeds: [embed],
                          ephemeral: true
                        })
                      case "stop":
                        await queue.stop(voiceChannel);
                        embed.setColor("Red").setDescription("🛑 La coda è stata fermata");
                        return interaction.reply({
                          embeds: [embed],
                          ephemeral: true
                        })
                      case "pause":
                        await queue.pause(voiceChannel);
                        embed.setColor("Orange").setDescription("⏸ La canzone è stata messa in pausa");
                        return interaction.reply({
                          embeds: [embed],
                          ephemeral: true
                        });
                      case "resume":
                        await queue.pause(voiceChannel);
                        embed.setColor("Green").setDescription("⏸ La canzone è stata ripresa");
                        return interaction.reply({
                          embeds: [embed],
                          ephemeral: true
                        })
                      case "queue":
                        embed.setColor('Purple').setDescription(`${queue.songs.map(
                          (song, id) => `\n**${id +1}.** ${song.name} -\`${song.formattedDuration}\``
                        )}`);
                        return interaction.reply({
                          embeds: [embed],
                          ephemeral: true
                        })
                    }
                }
              } catch(err) {
                console.log(err);

                embed.setColor("Red").setDescription("🛑 | Qualcosa è andato storto...");

                return interaction.reply({
                  embeds: [embed],
                  ephemeral: true
                })
              }
            }
}