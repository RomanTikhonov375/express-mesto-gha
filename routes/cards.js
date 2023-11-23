import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  createCard, getCards, deleteCard, likeCard, deleteLike,
} from '../controllers/cards';

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);
cardRouter.delete('/:id', deleteCard);
cardRouter.put('/:id/likes', likeCard);
cardRouter.delete('/:id/likes', deleteLike);

export default cardRouter;
