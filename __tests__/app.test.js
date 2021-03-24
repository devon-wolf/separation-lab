const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });

  it('ASYNC/AWAIT: creates a new order in our database and sends a text message', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    expect(res.body).toEqual({
      id: '1',
      quantity: 10,
    });
  });

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
});
