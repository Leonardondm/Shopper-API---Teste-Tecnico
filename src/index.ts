import express from 'express';
import dotenv from 'dotenv';
import uploadRoutes from './routes/uploadRoutes';
import confirmRoutes from './routes/confirmRoutes';
import listRoutes from './routes/listRoutes';

dotenv.config();

const app = express();
app.use(express.json());

app.use(uploadRoutes);
app.use(confirmRoutes);
app.use(listRoutes);

// Iniciar o servidor apenas se o arquivo for executado diretamente
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
  });
}

export default app;
