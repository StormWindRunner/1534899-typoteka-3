'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../constants`);


module.exports = (app, service) => {
  const route = new Router();
  app.use(`/categories`, route);

  route.get(`/`, async (req, res) => {

    const categories = await service.findAll();

    if (!categories) {
      res.status(HttpCode.NOT_FOUND)
        .send(`Something going wrong with categories!`);
    }

    res.status(HttpCode.OK)
    .json(categories);
  });
};