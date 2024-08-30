import { Request, Response } from 'express';

// Simulação de banco de dados
const measurementsDB: { [key: string]: Array<{ measure_uuid: string, measure_datetime: Date, measure_type: string, confirmed: boolean, image_url: string }> } = {
  "customer123": [
    { measure_uuid: "uuid_1", measure_datetime: new Date(), measure_type: "WATER", confirmed: true, image_url: "url_image_1" },
    { measure_uuid: "uuid_2", measure_datetime: new Date(), measure_type: "GAS", confirmed: false, image_url: "url_image_2" }
  ]
};

export const listMeasurements = (req: Request, res: Response) => {
  const { customer_code } = req.params;
  const { measure_type } = req.query;

  if (!measurementsDB[customer_code]) {
    return res.status(404).json({
      error_code: "MEASURES_NOT_FOUND",
      error_description: "Nenhuma leitura encontrada"
    });
  }

  let measures = measurementsDB[customer_code];

  if (measure_type && typeof measure_type === 'string') {
    const validType = ['WATER', 'GAS'].includes(measure_type.toUpperCase());
    if (!validType) {
      return res.status(400).json({
        error_code: "INVALID_TYPE",
        error_description: "Tipo de medição não permitida"
      });
    }
    measures = measures.filter(measure => measure.measure_type === measure_type.toUpperCase());
  }

  return res.status(200).json({
    customer_code,
    measures
  });
};
