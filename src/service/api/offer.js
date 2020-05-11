'use strict';

const {Router} = require(`express`);
const offerValidator = require(`../middlewares/offer-validator`);
const commentValidator = require(`../middlewares/comment-validator`);
const offerExists = require(`../middlewares/offer-exists`);
const {HttpCode} = require(`../../constants`);

const router = new Router();

module.exports = (app, offerService, commentService) => {
  app.use(`/offers`, router);

  router.get(`/`, (req, res) => {
    const offers = offerService.findAll();
    res.status(HttpCode.OK).json(offers);
  });

  router.get(`/:offerId`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    return res.status(HttpCode.OK).json(offer);
  });

  router.post(`/`, offerValidator, (req, res) => {
    const offer = offerService.create(req.body);
    return res.status(HttpCode.CREATED).json(offer);
  });

  router.put(`/:offerId`, offerValidator, (req, res) => {
    const {offerId} = req.params;
    const updatedOffer = offerService.update(offerId, req.body);

    if (!updatedOffer) {
      return res.status(HttpCode.NOT_FOUND).json({
        error: `Not found offer with id: ${offerId}`,
      });
    }

    return res.status(HttpCode.OK).json(updatedOffer);
  });

  router.delete(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const deletedOffer = offerService.drop(offerId);

    if (!deletedOffer) {
      return res.status(HttpCode.NOT_FOUND).json({
        error: `Not found offer with id: ${offerId}`,
      });
    }

    return res.status(HttpCode.OK).json(deletedOffer);
  });

  router.get(`/:offerId/comments`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    const comments = commentService.findAll(offer);
    res.status(HttpCode.OK).json(comments);
  });

  router.delete(`/:offerId/comments/:commentId`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    const {commentId} = req.params;
    const deletedComment = commentService.drop(offer, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND).json({
        error: `Not found`,
      });
    }

    return res.status(HttpCode.OK).json(deletedComment);
  });

  router.post(`/:offerId/comments`, [offerExists(offerService), commentValidator], (req, res) => {
    const {offer} = res.locals;
    const comment = commentService.create(offer, req.body);
    res.status(HttpCode.CREATED).json(comment);
  });
};
