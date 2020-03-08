'use strict';

const {Router} = require(`express`);
const authRouter = new Router();

authRouter.get(`/`, (req, res) => res.send(`/`));
authRouter.get(`/register`, (req, res) => res.send(`/register`));
authRouter.get(`/login`, (req, res) => res.send(`/login`));
authRouter.get(`/search`, (req, res) => res.send(`/search`));

module.exports = authRouter;
