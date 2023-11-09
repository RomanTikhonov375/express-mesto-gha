import express, { json } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import router from './routes/index';
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(json());
app.use((req, res, next) => {
  req.user = {
    _id: '654b321e2db4a2f82d80d9ef',
  };

  next();
});
app.use(router);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
