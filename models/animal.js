const mongoose = require('mongoose');

const AnimalEventsSchema = new mongoose.Schema({
  animal: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },
  DateTime:{
    type:Date,
    required:true
  }
});

module.exports = AnimalEvents = mongoose.model('animals', AnimalEventsSchema);
