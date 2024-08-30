"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const confirmRoutes_1 = __importDefault(require("./routes/confirmRoutes"));
const listRoutes_1 = __importDefault(require("./routes/listRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(uploadRoutes_1.default);
app.use(confirmRoutes_1.default);
app.use(listRoutes_1.default);
// Iniciar o servidor apenas se o arquivo for executado diretamente
if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
    });
}
exports.default = app;
