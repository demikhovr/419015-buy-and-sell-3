'use strict';

const {HttpCode} = require(`../../constants`);
const commentKeys = [`text`];

module.exports = (req, res, next) => {
  const comment = req.body;
  const keys = Object.keys(comment);
  const keysExists = commentKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.status(HttpCode.NOT_FOUND).json({
      error: `Bad request`,
    });
  }
  next();
};
