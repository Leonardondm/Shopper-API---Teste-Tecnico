import { Request, Response } from 'express';
import { processImage } from '../services/geminiService';

export const uploadImage = async (req: Request, res: Response) => {
  const { image, customer_code, measure_datetime, measure_type } = req.body;

  if (!image || !customer_code || !measure_datetime || !['WATER', 'GAS'].includes(measure_type)) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Dados fornecidos inválidos"
    });
  }

  try {
    const result = await processImage(image);
    return res.status(200).json({
      image_url: result.image_url,
      measure_value: result.measure_value,
      measure_uuid: result.measure_uuid
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao processar a imagem.' });
  }
};
 