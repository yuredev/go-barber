import 'reflect-metadata';
import express from 'express';
import { requestLogger } from './middlewares/requestLogger';
import httpRoutes from './routes';

import './database';

const PORT = 3001;
const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(httpRoutes);

app.listen(3001, () => {
  console.log('-------------------------------------------------');
  console.log(`< 🚀 Server listening on http://127.0.0.1:${PORT} />`);
  console.log('-------------------------------------------------');
});