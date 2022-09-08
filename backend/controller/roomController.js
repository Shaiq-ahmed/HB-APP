const asyncHandler = require('express-async-handler');
const Room = require('../models/roomModel');

exports.getAllRooms = asyncHandler(async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

exports.getRoomById = asyncHandler(async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (room) {
      res.send(room);
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

exports.addRoom = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      maxCount,
      description,
      imageUrls,
      type,
      rentPerDay,
      phoneNumber,
      location,
      facilities,
    } = req.body;
    const room = await Room.create({
      name,
      maxCount,
      description,
      imageUrls,
      type,
      rentPerDay,
      phoneNumber,
      location,
      facilities,
    });
    await room.save();
    res.send('Room has been added successfully');
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
