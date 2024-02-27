import User from './user.js';
import Stadium from './stadium.js';
const mongoose = require('mongoose');

const transaction =   new mongoose.Schema({
    buyerId:{'type':mongoose.Schema.Types.ObjectId, 'ref':'User'},
    stadiumId:{'type':mongoose.Schema.Types.ObjectId, 'ref':'Stadium'},
    amount:{'type':Number, 'required':true},
    time:{'type':Date},
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transaction);

module.exports = Transaction;