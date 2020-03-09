'use strict';

const {Router} = require(`express`);
const categoriesMock = require(`../../mocks/categories`);
const ticketsMock = require(`../../mocks/tickets`);

const offersRouter = new Router();

offersRouter.get(`/add`, (req, res) => res.render(`pages/new-ticket`));

offersRouter.get(`/:id`, (req, res) => {
  const pageContent = {
    author: `Денис Шкатулкин`,
    categories: [
      {
        image: `cat`,
        label: `Дом`,
      },
      {
        image: `cat02`,
        label: `Спорт и отдых`,
      }
    ],
    comments: [
      {
        author: `Георгий Шпиц`,
        avatar: `avatar02`,
        content: `Что это за рухлядь? Стыдно такое даже фотографировать, не то, что продавать.`,
      },
      {
        author: `Александр Бурый`,
        avatar: `avatar03`,
        content: `А что с прогоном автомобиля? Также вижу на фото зимнюю резину. А летняя идет ли впридачу?`,
      },
    ],
    date: `20 ноября 2019`,
    description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними вечерами. Ножки мягкие, мой пол не царапают. Кресло почти новое &ndash; продаю, т.к. надоел серый цвет. Можно, конечно, накинуть плед и спасти ситуацию, но я все-таки хочу просто другое кресло. В общем оно на самом деле удобное и с ним все хорошо, просто нам пора расстаться.`,
    isLogged: false,
    email: `shkatulkin@ya.ru`,
    image: `ticket`,
    price: `4000`,
    title: `Мое старое кресло`,
    type: `ПРОДАМ`,
  };

  res.render(`pages/ticket`, pageContent);
});

offersRouter.get(`/edit/:id`, (req, res) => {
  const pageContent = {
    categories: [
      {
        image: `cat`,
        label: `Дом`,
      },
      {
        image: `cat02`,
        label: `Спорт и отдых`,
      }
    ],
    description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними вечерами. Ножки мягкие, мой пол не царапают.`,
    image: `item02`,
    price: `4000`,
    title: `Мое старое кресло`,
    type: `Куплю`,
  };

  res.render(`pages/ticket-edit`, pageContent);
});

offersRouter.get(`/category/:id`, (req, res) => {
  const index = parseInt(req.params.id, 10);
  const pageContent = {
    categories: categoriesMock,
    category: categoriesMock[index],
    index,
    tickets: ticketsMock,
  };

  res.render(`pages/category`, pageContent);
});

module.exports = offersRouter;
