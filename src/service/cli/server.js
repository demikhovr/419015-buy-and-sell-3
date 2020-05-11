'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const {HttpCode} = require(`../../constants`);
const routes = require(`../api`);

const DEFAULT_PORT = 3000;
const NOT_FOUND_MESSAGE = `Not found`;
const API_PREFIX = `/api`;

module.exports = {
  name: `--server`,
  async run(args) {
    const [portArg] = args;
    const port = Number.parseInt(portArg, 10) || DEFAULT_PORT;

    const app = express();

    app.use(express.json());
    app.use(API_PREFIX, routes);

    app.use((req, res) => res.status(HttpCode.NOT_FOUND).json({
      error: NOT_FOUND_MESSAGE,
    }));

    app.listen(port, (err) => {
      if (err) {
        return console.error(chalk.red(`Ошибка при создании сервера`, err));
      }

      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};
