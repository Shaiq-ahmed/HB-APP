const asyncHandler = require('express-async-handler');
const Bookings = require('../models/bookingModel');
const stripe = require('stripe')(
  'sk_test_51LBuloSGnjrYRe42axKLH5jjFnh9kGzGcq14w05mQvrVtIZEaDNrkUO27hqMongI9Q3sAKDCtcqqNdFRrfpHreAT00PgXOKgzB'
);
const { v4: uuidv4 } = require('uuid');
const Room = require('../models/roomModel');
const moment = require('moment');

exports.bookRoom = asyncHandler(async (req, res) => {
  const { room, userId, fromDate, toDate, totalAmount, totalDays, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.paymentIntents.create(
      {
        amount: totalAmount * 100,
        customer: customer.id,
        currency: 'inr',
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const booking = new Bookings({
        room: room.name,
        userId,
        roomId: room._id,
        fromDate: moment(fromDate).format('DD-MM-YYYY'),
        toDate: moment(toDate).format('DD-MM-YYYY'),
        totalDays,
        totalAmount,
        transactionId: '123456',
      });
      await booking.save();
      res.status(200).json({ message: 'Booked Successfully' });
      console.log(room._id);

      const roomTemp = await Room.findById({ _id: room._id });
      console.log(roomTemp);
      roomTemp.currentBookings.push({
        bookingId: booking._id,
        fromDate: moment(fromDate).format('DD-MM-YYYY'),
        toDate: moment(toDate).format('DD-MM-YYYY'),
        userId,
        status: booking.status,
      });

      await roomTemp.save();
    }

    res.send('Payment Successfull, Your room is booked');
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

exports.getBookingByUserId = asyncHandler(async (req, res) => {
  const userId = req.body.userId;

  try {
    const booking = await Bookings.find({ userId: userId });
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error });
  }
});

exports.cancelBooking = asyncHandler(async (req, res) => {
  const { bookingId, roomId } = req.body;

  try {
    const bookingItem = await Bookings.findOne({ _id: bookingId });
    bookingItem.status = 'Cancelled';
    await bookingItem.save();

    const room = await Room.findOne({ _id: roomId });

    const bookings = room.currentBookings;
    console.log(room);
    console.log(bookings);
    const temp = bookings.filter(
      (booking) => booking.bookingId.toString() !== bookingId
    );
    console.log(bookingId);
    console.log(bookings.bookingId);

    console.log(temp);
    room.currentBookings = temp;
    await room.save();

    res.send('booking has been cancelled successfully');
  } catch (error) {
    res.status(400).json({ error });
  }
});

exports.getAllBookings = asyncHandler(async (req, res) => {
  try {
    const bookings = await Bookings.find();
    res.status(200).json(bookings);
    // res.send(bookings);
  } catch (error) {
    req.status(400).json({ message: error });
  }
});
