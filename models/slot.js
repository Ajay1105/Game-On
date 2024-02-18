const mongoose = require('mongoose');
import User from './user.js';

const slotSchema = new mongoose.Schema({
    stadiumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stadium',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Slot = mongoose.models.Slot || mongoose.model('Slot', slotSchema);
module.exports = Slot;