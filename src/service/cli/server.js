'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const getMockData = require(`../lib/get-mock-data`);
const {HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const NOT_FOUND_MESSAGE = `Not found`;

module.exports = {
  name: `--server`,
  run(args) {
    const [portArg] = args;
    const port = Number.parseInt(portArg, 10) || DEFAULT_PORT;

    const app = express();
    const router = new express.Router();

    app.use(express.json());
    app.use(router);

    router.get(`/offers`, async (req, res) => {
      try {
        const json = await getMockData();
        res.status(HttpCode.OK).send(json);
      } catch (err) {
        res.status(HttpCode.NOT_FOUND).send(NOT_FOUND_MESSAGE);
      }
    });

    app.use((req, res) => res.status(HttpCode.NOT_FOUND).send(NOT_FOUND_MESSAGE));

    app.listen(port, (err) => {
      if (err) {
        return console.error(chalk.red(`Ошибка при создании сервера`, err));
      }

      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};
