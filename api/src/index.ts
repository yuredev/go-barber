import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import { requestLogger } from './middlewares/requestLogger';
import httpRoutes from './routes';
import uploadConfig from './config/upload';
import './database';
import globalExceptionHandler from './middlewares/globalExceptionHandler';

const PORT = 3001;
const app = express();
app.use(express.json());
app.use(requestLogger);

// servir os arquivos que estão na pasta tmp
app.use('/files', express.static(uploadConfig.directory));

app.use(httpRoutes);

// middleware executado dps das rotas -> handler global de exceções
// obs: o express tem um problema de não pegar as exceções de rotas async
// para resolver isso podemos instalar o 'express-async-errors' e importalo, logo após o express
// assim como acontece neste arquivo
app.use(globalExceptionHandler);

app.listen(3001, () => {
  console.log('-------------------------------------------------');
  console.log(`< 🚀 Server listening on http://127.0.0.1:${PORT} />`);
  console.log('-------------------------------------------------');
});
