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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../src/index"));
let server; // Tipar corretamente o servidor como Server do módulo HTTP
beforeAll(() => {
    server = index_1.default.listen(4000); // Use uma porta livre para os testes
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
    it('deve retornar sucesso com a medida lida', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server)
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
    }));
});
