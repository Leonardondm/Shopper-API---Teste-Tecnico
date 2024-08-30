import request from 'supertest';
import app from '../src/index';

// Simulação de banco de dados
const measurementsDB: { [key: string]: { confirmed: boolean, value: number } } = {
  'uuid_1': { confirmed: false, value: 100 }
};

describe('PATCH /confirm', () => {
  it('deve confirmar uma medida com sucesso', async () => {
    // Inicialize a medida no banco de dados simulado
    measurementsDB['uuid_1'] = { confirmed: false, value: 100 };
    
    const response = await request(app)
      .patch('/confirm')
      .send({
        measure_uuid: 'uuid_1',
        confirmed_value: 120
      });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
