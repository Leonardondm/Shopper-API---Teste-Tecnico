import request from 'supertest';
import app from '../src/index';


describe('GET /:customer_code/list', () => {
  it('deve listar as medidas realizadas por um cliente', async () => {
    const response = await request(app)
      .get('/customer123/list');
    expect(response.status).toBe(200);
    expect(response.body.measures).toBeInstanceOf(Array);
  });
});
