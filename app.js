import express, { json } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { config } from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import { errors, celebrate, Joi } from 'celebrate';
import router from './routes/index';
import { createUser, login } from './controllers/users';

const { PORT = 3000 } = process.env;
const { DB_CONN = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
config();
const app = express();
app.use(helmet());

mongoose.connect(DB_CONN);
app.use(json());
app.use(router);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(30).required(),
    about: Joi.string().max(30).min(2),
    name: Joi.string().max(30).min(2),
    avatar: Joi.string().pattern(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(30).required(),
  }),
}), login);

app.use(errors());
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === StatusCodes.INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
