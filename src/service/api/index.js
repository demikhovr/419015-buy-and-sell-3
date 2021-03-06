'use strict';

const {Router} = require(`express`);
const {
  CategoryService,
  CommentService,
  OfferService,
  SearchService,
} = require(`../data-service`);
const getMockData = require(`../lib/get-mock-data`);
const category = require(`./category`);
const offer = require(`./offer`);
const search = require(`./search`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  category(app, new CategoryService(mockData));
  offer(app, new OfferService(mockData), new CommentService());
  search(app, new SearchService(mockData));
})();

module.exports = app;
