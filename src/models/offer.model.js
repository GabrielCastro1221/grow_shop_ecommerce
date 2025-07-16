const { Schema, model } = require('mongoose');

const schema = new Schema({
    description: {
        type: String,
        required: true,
    },
    offerPrice: {
        type: Number,
        required: true,
    },
    originalPrice: {
        type: Number,
        required: true,
    },
    countdown_start: {
        type: Date,
        required: true,
    },
    countdown_end: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model('Offer', schema);
