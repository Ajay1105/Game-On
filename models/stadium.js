const mongoose = require('mongoose');

const stadiumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  information: {
    type: String,
  },
  bookedSlots: [{
    startTime:{type: Date},
    endTime:{type:Date},
  }]
});

const Stadium = mongoose.models.Stadium || mongoose.model('Stadium', stadiumSchema);

module.exports = Stadium;
