import express from 'express';
import bodyParser from 'body-parser';
import weightRouter from './routes/weights.js';

const app = express();

app.use(bodyParser.json());

app.use('/api/weights', weightRouter);

app.listen(8800, () => {
  console.log('API working!');
});
