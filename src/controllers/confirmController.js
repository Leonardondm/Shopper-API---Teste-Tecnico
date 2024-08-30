"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmMeasurement = void 0;
// Simulação de banco de dados
const measurementsDB = {};
const confirmMeasurement = (req, res) => {
    const { measure_uuid, confirmed_value } = req.body;
    if (!measure_uuid || typeof confirmed_value !== 'number') {
        return res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Dados fornecidos inválidos"
        });
    }
    const measurement = measurementsDB[measure_uuid];
    if (!measurement) {
        return res.status(404).json({
            error_code: "MEASURE_NOT_FOUND",
            error_description: "Leitura não encontrada"
        });
    }
    if (measurement.confirmed) {
        return res.status(409).json({
            error_code: "CONFIRMATION_DUPLICATE",
            error_description: "Leitura já confirmada"
        });
    }
    // Atualiza a medida no banco de dados simulado
    measurement.confirmed = true;
    measurement.value = confirmed_value;
    return res.status(200).json({
        success: true
    });
};
exports.confirmMeasurement = confirmMeasurement;
