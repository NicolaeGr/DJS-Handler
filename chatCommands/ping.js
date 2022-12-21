module.exports = {
  name: "ping",
  description: "ping shit",
  aliases: ["p"],
  execute: (message, args, client) => {
    message.channel.send("Pong!");
  },
};
