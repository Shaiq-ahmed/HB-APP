const mongoose = require('mongoose');

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    maxCount: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    facilities: [],
    phoneNumber: {
      type: Number,
      required: true,
    },
    imageUrls: [],
    description: {
      type: String,
      required: true,
    },
    rentPerDay: {
      type: Number,
      required: true,
    },
    currentBookings: [],
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('rooms', roomSchema);
