const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: { type: String },
    phoneNumber: { type: String, trim: true, minlength: 10 },
    address: { type: String },
    email: { type: String },
    password: { type: String, minlength: 3},
    roomId: { type: String },
}, {
  timestamps: true,
});

const User = mongoose.model('Users', userSchema);

module.exports = User;