const chalk = require("chalk");

module.exports = {
    name: "disconnected",
    execute() {
      console.red(chalk.green("[Stato Database]: Disconnesso."));
  },
};