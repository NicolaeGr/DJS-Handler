const { REST, Routes, Events } = require("discord.js");
const fs = require("node:fs");
module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: (client) => {
    console.log("Bot ready");

    let commands = [];
    client.slashCmds.forEach((command) => commands.push(command.data.toJSON()));

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    const guildIds = client.guilds.cache.map((guild) => guild.id);
    client.guilds.cache.forEach(async (guild) => {
      try {
        const data = await rest.put(
          Routes.applicationGuildCommands(client.user.id, guild.id),
          { body: commands }
        );
      } catch (error) {
        console.error(error);
      }
    });
  },
};
