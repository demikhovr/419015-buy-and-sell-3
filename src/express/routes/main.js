'use strict';

const {Router} = require(`express`);
const ticketsMocks = require(`../../mocks/tickets`);
const searchResultsMocks = require(`../../mocks/searchResults`);
const categoriesMocks = require(`../../mocks/categories`);

const mainRouter = new Router();

mainRouter.get(`/register(.html)?`, (req, res) => res.render(`pages/sign-up`));
mainRouter.get(`/login(.html)?`, (req, res) => res.render(`pages/login`));

mainRouter.get([`/`, `/index`, `/index.html`, `/main`, `/main.html`], (req, res) => {
  const pageContent = {
    categories: categoriesMocks,
    tickets: ticketsMocks,
  };

  res.render(`pages/main`, pageContent);
});

mainRouter.get(`/search(.html)?`, (req, res) => {
  const pageContent = {
    results: searchResultsMocks,
    tickets: ticketsMocks,
  };

  res.render(`pages/search-result`, pageContent);
});

module.exports = mainRouter;
