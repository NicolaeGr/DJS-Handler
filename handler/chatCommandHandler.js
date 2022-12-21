const cTable = require("console.table");
const validateCommand = require("./validateCommand");

/**
 * @param {String} commandTable[].name Name of command
 * @param {String[]} commandTable[].aliases Aliases for given command
 */
let commandTable = [];

module.exports = async (err, files, client) => {
  if (err) return console.error(err);

  for (let file in files) {
    const command = require(`./../chatCommands/${files[file]}`);

    if (!validateCommand(command)) break;

    client.chatCmds.set(command.name, command);
    let localTable = {
      name: command.name,
      aliases: [],
    };

    if (command.aliases != []) {
      command.aliases.forEach((alias) => {
        client.chatCmdsAliases.set(alias, command.name);
        localTable.aliases.push(alias);
      });
    }
    commandTable.push({
      name: command.name,
    });
  }
  console.log("Available commands:");
  console.table(commandTable);
};
