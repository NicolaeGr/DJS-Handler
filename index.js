const fs = require("fs");
const { Client, Collection, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.DirectMessages,
  ],
});

client.chatCmds = new Collection();
client.chatCmdsAliases = new Collection();
client.slashCmds = new Collection();

fs.readdir("./chatCommands/", async (err, files) => {
  const chatCommandHandler = require("./handler/chatCommandHandler");
  await chatCommandHandler(err, files, client);
});

fs.readdir("./events/", (err, files) => {
  const eventHandler = require("./handler/eventHandler");
  eventHandler(err, files, client);
});

fs.readdir("./slashCommands/", (err, files) => {
  const slashCommandHandler = require("./handler/slashCommandHandler");
  slashCommandHandler(err, files, client);
});

client.login(process.env.TOKEN);
