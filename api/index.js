import Express from 'express';
import bodyParser from 'body-parser';
import weightRouter from './routes/weights.js';
import caloriesRouter from './routes/calories.js'
import activityRouter from './routes/activity.js'
import authRouter from './routes/auth.js'
import cookieParser from "cookie-parser";
import cors from "cors";


const app = Express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(Express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

app.use(bodyParser.json());

app.use('/api/weights', weightRouter);
app.use('/api/calories', caloriesRouter);
app.use('/api/activity', activityRouter)
app.use('/api/auth', authRouter)

app.listen(8800, () => {
  console.log('API working!');
});
