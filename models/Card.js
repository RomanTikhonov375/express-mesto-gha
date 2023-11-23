import mongoose from 'mongoose';

const cardSheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlenght: [2, 'Минимальная длинна 2 символа'],
      maxlenght: [30, 'Максимальная длинна 30 символов'],
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(v),
        message: (props) => `${props.value} Не валидный URL адрес`,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      default: [],
      ref: 'user',
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },

  },
  // Options
  {
    versionKey: false,
    timestamps: true,
  },
);

export default mongoose.model('card', cardSheme);
