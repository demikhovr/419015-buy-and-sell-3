'use strict';

const express = require(`express`);
const path = require(`path`);
const chalk = require(`chalk`);
const router = require(`./routes`);
const {DEFAULT_PORT} = require(`../constants`);

const TEMPLATES_DIR = path.resolve(__dirname, `templates`);
const PUBLIC_DIR = path.resolve(__dirname, `public`);

const app = express();

app.use(express.static(PUBLIC_DIR));
app.use(router);

app.set(`views`, TEMPLATES_DIR);
app.set(`view engine`, `pug`);

app.listen(DEFAULT_PORT, () => console.info(chalk.green(`Server launched on port: ${DEFAULT_PORT}`)));
