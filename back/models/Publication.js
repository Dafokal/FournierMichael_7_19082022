const mongoose = require('mongoose');

// Data model of a publication
const publicationSchema = mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  imageUrl: { type: String, required: false },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: Array, required: true },
  usersDisliked: { type: Array, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model('Publication', publicationSchema);