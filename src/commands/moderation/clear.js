const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Elimina un numero specifico di messaggi da un canale o di un utente")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(option =>
        option
        .setName('messaggi')
        .setDescription('Il numero di messaggi da eliminare')
        .setMinValue(1)
        .setMaxValue(10000)
        .setRequired(true)
        )
    .addUserOption(option =>
        option
        .setName('utente')
        .setDescription('L utente a cui eliminare i messaggi(facoltativa)')
        .setRequired(false)
        ),

    async execute(interaction) {
        const {channel, options} = interaction;

        const amount = options.getInteger('messaggi');
        const target = options.getUser("utente");

        const messages = await channel.messages.fetch({
            limit: amount +1,
        });

        const res = new EmbedBuilder()
            .setColor(0x5fb041)

        if(target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) =>{
                if(msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`Eliminati con successo ${messages.size} messaggi di ${target}.`);
                interaction.reply({embeds: [res], ephemeral: true}); // you can use ephemeral if you desire
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`Eliminati con successo ${messages.size} messaggi dal canale.`);
                interaction.reply({embeds: [res], ephemeral: true});
            });
        }
    }
}