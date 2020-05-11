'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {
  create(offer, comment) {
    const newComment = {
      id: nanoid(MAX_ID_LENGTH),
      ...comment,
    };

    offer.comments.push(newComment);
    return newComment;
  }

  drop(offer, id) {
    const index = offer.comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      return null;
    }

    return offer.comments.splice(index, 1)[0];
  }

  findAll(offer) {
    return offer.comments;
  }
}

module.exports = CommentService;
