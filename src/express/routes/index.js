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

router.use((req, res) => {
  const pageContent = {
    htmlClass: `html-not-found`,
    bodyClass: `body-not-found`,
  };

  res.status(HttpCode.NOT_FOUND);
  res.render(`pages/404`, pageContent);
});

router.use((req, res) => {
  const pageContent = {
    htmlClass: `html-server`,
    bodyClass: `body-server`,
  };

  res.status(HttpCode.INTERNAL_SERVER_ERROR);
  res.render(`pages/500`, pageContent);
});

module.exports = router;
