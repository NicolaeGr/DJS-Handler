module.exports = (err, files, client) => {
  if (err) return console.error(err);

  for (let file of files) {
    const event = require(`./../events/${file}`);

    try {
      if (event.disabled) break;
      if (event.once)
        client.once(event.name, (...args) => event.execute(...args));
      else client.on(event.name, (...args) => event.execute(...args));
    } catch (error) {
      console.error(error.stack);
    }
  }
};
