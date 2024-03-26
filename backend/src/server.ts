import express from "express"
import { router } from "./routes";
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'http://localhost:8888',
  optionsSuccessStatus: 200 // Alguns navegadores antigos podem precisar dessa opção para suportar a resposta CORS
};

app.use(router)
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
