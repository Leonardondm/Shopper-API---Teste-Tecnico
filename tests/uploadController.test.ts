import request from 'supertest';
import app from '../src/index';
import { Server } from 'http'; // Importe o tipo do servidor HTTP

let server: Server; // Tipar corretamente o servidor como Server do módulo HTTP

beforeAll(() => {
  server = app.listen(4000); // Use uma porta livre para os testes
});

afterAll(() => {
  server.close(); // Fecha o servidor após os testes para evitar problemas com handles abertos
});

jest.mock('../src/services/geminiService', () => ({
  processImage: jest.fn().mockResolvedValue({
    image_url: 'mocked_image_url',
    measure_value: 123,
    measure_uuid: 'mocked_uuid'
  })
}));

describe('POST /upload', () => {
  it('deve retornar sucesso com a medida lida', async () => {
    const response = await request(server)
      .post('/upload')
      .send({
        image: 'base64_image_string',
        customer_code: 'customer123',
        measure_datetime: '2024-08-01T12:00:00Z',
        measure_type: 'WATER'
      });
      
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('image_url', 'mocked_image_url');
    expect(response.body).toHaveProperty('measure_value', 123);
    expect(response.body).toHaveProperty('measure_uuid', 'mocked_uuid');
  });
});
