"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const geminiService_1 = require("../services/geminiService");
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { image, customer_code, measure_datetime, measure_type } = req.body;
    if (!image || !customer_code || !measure_datetime || !['WATER', 'GAS'].includes(measure_type)) {
        return res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Dados fornecidos inválidos"
        });
    }
    try {
        const result = yield (0, geminiService_1.processImage)(image);
        return res.status(200).json({
            image_url: result.image_url,
            measure_value: result.measure_value,
            measure_uuid: result.measure_uuid
        });
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro ao processar a imagem.' });
    }
});
exports.uploadImage = uploadImage;
