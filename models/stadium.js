const mongoose = require('mongoose');
import Transaction from './transaction.js';

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
  price: {
    type: Number,
    required: true
  },
  information: {
    type: String,
  },
  bookedSlots: [{
    startTime:{type: Date},
    transactionId: {'type':mongoose.Schema.Types.ObjectId, 
    'ref':'Transaction'},
  }],
  photos: [{type: String}]
});

const Stadium = mongoose.models.Stadium || mongoose.model('Stadium', stadiumSchema);

module.exports = Stadium;
