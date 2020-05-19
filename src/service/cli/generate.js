'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const {getRandomInt, shuffle} = require(`../../util`);
const {ExitCode, MAX_ID_LENGTH} = require(`../../constants`);

const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;
const FILE_OUTPUT_PATH = `mocks.json`;

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const MAX_SENTENCES = 5;
const MAX_COMMENTS = 4;

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trimEnd().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const getPictureFileName = (number) => number > 10 ? `item${number}.jpg` : `item0${number}.jpg`;

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `),
  }))
);

const generateOffers = ({count, titles, sentences, categories, comments}) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    description: shuffle(sentences).slice(0, MAX_SENTENCES).join(` `),
    type: Object.values(OfferType)[Math.floor(Math.random() * Object.values(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    category: [categories[getRandomInt(0, categories.length - 1)]],
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
    id: nanoid(MAX_ID_LENGTH),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const promises = [
      FILE_TITLES_PATH,
      FILE_SENTENCES_PATH,
      FILE_CATEGORIES_PATH,
      FILE_COMMENTS_PATH,
    ].map(readContent);

    const [
      titles,
      sentences,
      categories,
      comments,
    ] = await Promise.all(promises);

    const [countArg] = args;
    const count = Number.parseInt(countArg, 10) || DEFAULT_COUNT;

    if (count > MAX_COUNT) {
      console.error(chalk.red(`Не больше 1000 объявлений.`));
      process.exit(ExitCode.ERROR);
    }

    const offers = generateOffers({
      count,
      titles,
      sentences,
      categories,
      comments,
    });

    const content = JSON.stringify(offers);

    try {
      await fs.writeFile(FILE_OUTPUT_PATH, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};
