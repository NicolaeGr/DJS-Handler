const { Events } = require("discord.js");
module.exports = {
  name: Events.InteractionCreate,
  once: false,
  execute: async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.slashCmds.get(interaction.commandName);

    if (!command) {
      console.warn(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
