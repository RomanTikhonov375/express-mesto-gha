import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers, getUsersById, updateProfile, updateAvatar, getCurrentUser,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:id', getUsersById);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.required(),
  }),
}), updateAvatar);

export default userRouter;
