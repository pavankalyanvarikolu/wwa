// /model/Booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, },
    address: { type: String, required: true },
    contact: { type: Number, required: true },
    adult: { type: Number, default: 0 },
    children: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    bookingnumber: { type: String, required: true },
    adventures: {
        Thrillville: [{ type: String, }],
        Questworld: [{ type: String, }],
        Spiritrealm: [{ type: String, }],
        ShadowKingdom: [{ type: String, }],
    },
});


const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;