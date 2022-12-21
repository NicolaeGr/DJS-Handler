const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("ping shit"),
  execute: async (interaction) => {
    interaction.reply({ content: "Pong!" });
  },
};
