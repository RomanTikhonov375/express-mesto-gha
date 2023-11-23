import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers, getUsersById, updateProfile, updateAvatar, getCurrentUser,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUsersById);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/).required(),
  }),
}), updateAvatar);

export default userRouter;
