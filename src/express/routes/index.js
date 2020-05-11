'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const mainRouter = require(`./main`);
const myRouter = require(`./my`);
const offersRouter = require(`./offers`);

const router = new Router();

router.use(`/`, mainRouter);
router.use(`/my(.html)?`, myRouter);
router.use(`/offers(.html)?`, offersRouter);

router.use((req, res) => res.status(HttpCode.NOT_FOUND).render(`pages/errors/404`));
router.use((req, res) => res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`pages/errors/500`));

module.exports = router;
