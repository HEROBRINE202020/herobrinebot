const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async (async) => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(`Comando: ${command.data.name} è passato dentro l'handler`);
      }
    }

    const clientId = "1050459933335887882";
    const guildId = "980382223918325780";
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log("Iniziato a ricaricare la applicazione (/) commands.");

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      });

      console.log("Ricaricati con successo la applicazione (/) commands.");
    } catch (error) {
      console.error(error);
    }
  };
};
