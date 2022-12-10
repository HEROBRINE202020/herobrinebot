const { EmbedBuilder } = require('discord.js')


module.exports = client => {

    client.on("guildMemberAdd", member => {
        const channelID = '980888492408180736';
        console.log(member)

        const message = `**<@${member}> BENVENUTO NEL SERVER DEI PROGAMERS!
        COMINCIA AD AMBIENTARTI LEGGENDO LE REGOLE E SOCIALIZZANDO.** `;

        const channel = member.guild.channels.cache.get(channelID)
        

        const embed = new EmbedBuilder()
          .setColor('Green')
          .setTitle('Nuovo membro!')
          .setDescription(message)
          .setImage('https://img.redbull.com/images/c_fill,w_1200,h_630,g_auto,f_auto,q_auto/redbullcom/2020/9/15/wvsilettidkbbu0e0mlt/among-us')
    
       channel.send({
        embeds: [embed]
       });
       member.roles.add('986644957538430976')
    
    
    
    })

}