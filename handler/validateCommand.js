const checkCommandProperties = (cmd) => {
  if (
    !cmd.hasOwnProperty("name") ||
    typeof cmd.name != "string" ||
    !cmd.hasOwnProperty("description") ||
    typeof cmd.description != "string" ||
    !cmd.hasOwnProperty("execute") ||
    typeof cmd.execute != "function"
  )
    return false;

  return true;
};

module.exports = (cmd) => {
  return checkCommandProperties(cmd);
};
