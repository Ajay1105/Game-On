const mongoose = require('mongoose');
import Slot from './slot.js';

const user =   new mongoose.Schema({
    name:{'type':String, 'required':true},
    email:{'type':String, 'required':true},
    bookedSlot:[{
        'type':mongoose.Schema.Types.ObjectId,
        'ref':'Slot'
    }]
});

const User = mongoose.models.User || mongoose.model('User', user);

module.exports = User;