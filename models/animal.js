const mongoose = require('mongoose');

const AnimalEventsSchema = new mongoose.Schema({
  animal: {
    type: [],
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
});

module.exports = AnimalEvents = mongoose.model('animals', AnimalEventsSchema);
