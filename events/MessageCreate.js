const { Events } = require("discord.js");
module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute: async (message) => {
    const prefix = process.env.PREFIX || " ";

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command =
      message.client.chatCmds.get(commandName) ||
      message.client.chatCmds.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;

    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;
      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }
      return message.channel.send(reply);
    }

    try {
      command.execute(message, args, message.client);
    } catch (error) {
      console.error(error);
      message.reply("There was an error trying to execute that command!");
    }
  },
};
