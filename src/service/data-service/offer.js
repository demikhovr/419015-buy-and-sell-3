'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class OfferService {
  constructor(offers) {
    this._offers = offers;
  }

  create(offer) {
    const newOffer = {
      comments: [],
      id: nanoid(MAX_ID_LENGTH),
      ...offer,
    };

    this._offers.push(newOffer);
    return newOffer;
  }

  drop(id) {
    const index = this._offers.findIndex((offer) => offer.id === id);

    if (index === -1) {
      return null;
    }

    return this._offers.splice(index, 1)[0];
  }

  findAll() {
    return this._offers;
  }

  findOne(id) {
    return this._offers.find((offer) => offer.id === id);
  }

  update(id, newOffer) {
    const index = this._offers.findIndex((offer) => offer.id === id);

    if (index === -1) {
      return null;
    }

    const updatedOffer = {
      ...this._offers[index],
      ...newOffer,
    };

    this._offers[index] = updatedOffer;
    return updatedOffer;
  }
}

module.exports = OfferService;
