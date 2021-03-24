const { Router } = require('express');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } 
    catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const orders = await OrderService.getAll();
      res.send(orders);
    }
    catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const order = await OrderService.getByID(req.params.id);
      res.send(order);
    }
    catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const order = await OrderService.update(req.params.id, req.body);
      res.send(order);
    }
    catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const order = await OrderService.delete(req.params.id);
      res.send(order);
    }
    catch (err) {
      next(err);
    }
  });
