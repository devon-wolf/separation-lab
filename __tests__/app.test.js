const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('order routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    expect(res.body).toEqual({
      id: '1',
      quantity: 10,
    });
  });

  // it('sends a text message on new order', async () => {
  //   await request(app)
  //     .post('/api/v1/orders')
  //     .send({ quantity: 10 });

  //   expect(/* the SMS function */).toHaveBeenCalledTimes(1);
  // });

  it('gets all orders from our database', async () => {
    await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });
    
    const res = await request(app)
      .get('/api/v1/orders');

    expect(res.body).toEqual([{
      id: '1',
      quantity: 10,
    }]);
  });

  it('gets a single order by its ID', async () => {
    await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    const res = await request(app)
      .get('/api/v1/orders/1');

    expect(res.body).toEqual({
      id: '1',
      quantity: 10,
    });
  });

  it('edits an order', async () => {
    await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    const res = await request(app)
      .put('/api/v1/orders/1')
      .send({ quantity: 5 });

      expect(res.body).toEqual({
        id: '1',
        quantity: 5,
      });
  });

  // it('sends a text message on order update', async () => {
  //   await request(app)
  //     .put('/api/v1/orders/1')
  //     .send({ quantity: 5 });

  //   expect(/* the SMS function */).toHaveBeenCalledTimes(1);
  // });

  it('deletes an order', async () => {
    await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    const res = await request(app)
      .delete('/api/v1/orders/1');

    expect(res.body).toEqual({
      id: '1',
      quantity: 10,
    });
  });

  // it('sends a text message on order delete', async () => {
  //   await request(app)
  //     .delete('/api/v1/orders/1');

  //   expect(/* the SMS function */).toHaveBeenCalledTimes(1);
  // });
});
