import 'reflect-metadata';
import express from 'express';
import { requestLogger } from './middlewares/requestLogger';
import httpRoutes from './routes';
import uploadConfig from './config/upload';
import './database';

const PORT = 3001;
const app = express();
app.use(express.json());
app.use(requestLogger);

// servir os arquivos que estão na pasta tmp
app.use('/files', express.static(uploadConfig.directory));

app.use(httpRoutes);

app.listen(3001, () => {
  console.log('-------------------------------------------------');
  console.log(`< 🚀 Server listening on http://127.0.0.1:${PORT} />`);
  console.log('-------------------------------------------------');
});
