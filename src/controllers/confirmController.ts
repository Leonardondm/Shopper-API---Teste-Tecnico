import { Request, Response } from 'express';

// Simulação de banco de dados
const measurementsDB: { [key: string]: { confirmed: boolean, value: number } } = {
  'uuid_1': { confirmed: false, value: 100 }  // Inicialize o banco de dados com uuid_1
};

export const confirmMeasurement = (req: Request, res: Response) => {
  const { measure_uuid, confirmed_value } = req.body;

  // Validação dos parâmetros recebidos
  if (!measure_uuid || typeof confirmed_value !== 'number') {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Dados fornecidos inválidos"
    });
  }

  // Verifique se a medida existe no banco de dados
  const measurement = measurementsDB[measure_uuid];

  if (!measurement) {
    return res.status(404).json({
      error_code: "MEASURE_NOT_FOUND",
      error_description: "Leitura não encontrada"
    });
  }

  // Verifique se a medida já foi confirmada
  if (measurement.confirmed) {
    return res.status(409).json({
      error_code: "CONFIRMATION_DUPLICATE",
      error_description: "Leitura já confirmada"
    });
  }

  // Atualize a medida no banco de dados simulado
  measurement.confirmed = true;
  measurement.value = confirmed_value;

  return res.status(200).json({
    success: true
  });
};
