'use strict';

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll(query) {
    return this._offers.filter((offer) => offer.title.includes(query));
  }
}

module.exports = SearchService;
