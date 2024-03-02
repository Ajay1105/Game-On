const mongoose = require('mongoose');

const stadiumadmin = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  stadiumId: {
    'type':mongoose.Schema.Types.ObjectId, 
    'ref':'Stadium',
    required: true
  }
});

const StadiumAdmin = mongoose.models.StadiumAdmin || mongoose.model('StadiumAdmin', stadiumadmin);

module.exports = StadiumAdmin;
