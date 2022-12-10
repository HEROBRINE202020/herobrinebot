const chalk = require("chalk");

module.exports = {
    name: "err",
    execute(err) {
      console.log(
          chalk.red(`Un errore si è verificato durante la connessione al database:\n${err}`)
    );
  },
};