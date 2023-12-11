import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import crypto from 'crypto';

import apiRouter from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (_, res) => {
  res.send('Register Server!');
});

app.use('/api', apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
