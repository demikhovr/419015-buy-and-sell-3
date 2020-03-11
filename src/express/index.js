'use strict';

const express = require(`express`);
const path = require(`path`);
const chalk = require(`chalk`);
const router = require(`./routes`);
const {DEFAULT_PORT} = require(`../constants`);

const TEMPLATES_DIR = path.join(__dirname, `templates`);

const app = express();

app.use(express.static(`markup`));
app.use(router);

app.set(`views`, TEMPLATES_DIR);
app.set(`view engine`, `pug`);

app.listen(DEFAULT_PORT, () => console.info(chalk.green(`Server launched on port: ${DEFAULT_PORT}`)));
