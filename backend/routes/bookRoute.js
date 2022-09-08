const express = require('express');
const {
  bookRoom,
  getBookingByUserId,
  cancelBooking,
  getAllBookings,
} = require('../controller/bookingController');
const router = express.Router();

router.route('/bookRoom').post(bookRoom);
router.route('/getBookingByUserId').post(getBookingByUserId);
router.route('/cancelBooking').post(cancelBooking);
router.route('/getAllBookings').get(getAllBookings);

module.exports = router;
