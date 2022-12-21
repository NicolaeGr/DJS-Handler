module.exports = (err, files, client) => {
  if (err) return console.error(err);

  for (const file of files) {
    const command = require(`./../slashCommands/${file}`);

    if ("data" in command && "execute" in command) {
      client.slashCmds.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
};
