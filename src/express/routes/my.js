'use strict';

const {Router} = require(`express`);
const ticketsMock = require(`../../mocks/tickets`);
const commentsMock = require(`../../mocks/comments`);

const myRouter = new Router();

myRouter.get([`/`, `/index`, `/index.html`], (req, res) => {
  const pageContent = {
    tickets: ticketsMock,
  };

  res.render(`pages/my-tickets`, pageContent);
});

myRouter.get(`/comments(.html)?`, (req, res) => {
  const pageContent = {
    offers: commentsMock,
  };

  res.render(`pages/comments`, pageContent);
});

module.exports = myRouter;
