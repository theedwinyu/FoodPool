const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    orders: { type: [[String]]},
    shoplng: { type: Number },
    shoplat: { type: Number },
    lng: { type: Number },
    lat: { type: Number },
    gid: {type:String},
    roomid: {type:String},
    users: {type:[String]}
}, {
  timestamps: true,
});

const Room = mongoose.model('Rooms', roomSchema);

module.exports = Room;