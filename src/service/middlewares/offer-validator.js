'use strict';

const {HttpCode} = require(`../../constants`);

const offerKeys = [`category`, `description`, `picture`, `sum`, `title`, `type`];

module.exports = (req, res, next) => {
  const offer = req.body;
  const keys = Object.keys(offer);
  const keysExists = offerKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.status(HttpCode.BAD_REQUEST).json({
      error: `Bad request`,
    });
  }

  next();
};
