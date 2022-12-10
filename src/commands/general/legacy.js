const { SlashCommandBuilder, EmbedBuilder, Embed, messageLink } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("legacy")
    .setDescription("Riscatta la ricompensa entro il tempo limite, e verrai segnato come legacy bot tester"),

    async execute(interaction, client) {
    const mathsup = Math.floor(Math.random() * 2000000000 + 1000000000)
    const channel = client.channels.cache.get('1047234175901630494')
    const { roles } = interaction.member;
    let role = interaction.guild.roles.cache.find(role => role.name === 'LEGACY SERVER')
    const member = await interaction.guild.members
      .fetch(interaction.user.id)
    
        
      const embed = new EmbedBuilder()
          .setTitle("Hai riscattato la ricompensa!(Ruolo) E non pensare che sia l'ultima...+ ecco il tuo codice legacy(salvalo da qualche parte perchè serve in caso di assistenza)")
          .setDescription("Il tuo codice legacy e " + mathsup)
      const embedfalse = new EmbedBuilder()
          .setTitle("Hai già riscattato la ricompensa")
          .setDescription("Hai già riscattato il ruolo")
          
      
        
          
    
          
       if (!roles.cache.has('1047528623227289701')) {
        await interaction.reply({
          embeds: [embed],
          ephemeral: true,
       })
       interaction.guild.channels.cache.get('1047234175901630494').send(`Un nuovo utente ha riscattato la ricompensa, il codice e ${mathsup} ${interaction.user.tag}`)
       interaction.member.roles.add(role)
       
         
    }
    if (roles.cache.has('1047528623227289701')) {
      await interaction.reply({
        embeds: [embedfalse],
        ephemeral: true,
     })
    }
    
  }
}
    

      
            
      
    
      
         
    
    
    
      
         
      
          
      
        
      
      
  
   

   

  

