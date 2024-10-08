import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes';
import errorMiddleware from './middleware/error';
import './recommendation/recommendation';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.CLIENT_URL] as string[],
    credentials: true,
    methods: 'GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization, Set-Cookie',
    exposedHeaders: 'X-Total-Count',
  }),
);

app.use(router);

app.use(errorMiddleware);

app.listen(process.env.SERVER_PORT, () => {
  return console.log(`Server is listening at http://localhost:${process.env.SERVER_PORT}`);
});
