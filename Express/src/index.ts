import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler';

import appRoutes from './routes/app'
import userRoutes from './routes/user'

dotenv.config();
const app = express()
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev')); // 常用的格式：dev、combined、tiny
app.use(express.json()); 
app.use(errorHandler); // 统一错误处理中间件


app.use('/api/apps', appRoutes)
app.use('/api/users', userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})