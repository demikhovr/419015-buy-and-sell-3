'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {HttpCode} = require(`../../constants`);

const FILENAME = `mocks.json`;
const DEFAULT_PORT = 3000;

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="utf-8">
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const handleClientConnect = async (req, res) => {
  const notFoundMessageText = `Not found`;

  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILENAME);
        const mocks = JSON.parse(fileContent);
        const message = `<ul>${mocks.map((post) => `<li>${post.title}</li>`).join(``)}</ul>`;
        sendResponse(res, HttpCode.OK, message);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      }
      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      break;
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    const [portArg] = args;
    const port = Number.parseInt(portArg, 10) || DEFAULT_PORT;

    http.createServer(handleClientConnect)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          return console.error(chalk.red(`Ошибка при создании сервера`, err));
        }

        return console.info(chalk.green(`Ожидаю соединений на ${port}`));
      });
  },
};
