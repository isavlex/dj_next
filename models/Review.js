const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
  // review_id: {type: Number, unique: true},
  _id: Number,
  published: {type: Boolean, required: true},
  name: {
    type: String,
    required: [true, 'Пожалуйста, укажите ваше имя'],
    unique: false,
    maxlength: [40, 'Имя не должно содержать более 40 символов'],
  },
  event: {
    type: String,
    required: [true, 'Пожалуйста, укажите мероприятие'],
    unique: false,
    maxlength: [40, 'Мероприятие не должно содержать более 40 символов'],
  },
  link: {
    type: String,
    required: [true, 'Пожалуйста, добавьте ссылку на ваш профиль'],
    unique: false,
    maxlength: [100, 'Ссылка на профиль не должна содержать более 100 символов'],
  },
  review: {
    type: String,
    required: [true, 'Пожалуйста, добавьте отзыв'],
    maxlength: [500, 'Отзыв не должен содержать более 200 символов'],
  },
})

module.exports =
  mongoose.models.Review || mongoose.model('Review', ReviewSchema)
