import express from 'express';
import bodyParser from 'body-parser';
import weightRouter from './routes/weights.js';
import caloriesRouter from './routes/calories.js'

const app = express();

app.use(bodyParser.json());

app.use('/api/weights', weightRouter);
app.use('/api/calories', caloriesRouter);

app.listen(8800, () => {
  console.log('API working!');
});
