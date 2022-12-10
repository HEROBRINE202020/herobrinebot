const chalk = require("chalk");

module.exports = {
    name: "connected",
    execute() {
      console.log(chalk.green("[Stato Database]: Connesso."));
  },
};