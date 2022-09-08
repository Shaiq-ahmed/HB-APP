const express = require('express');
const {
  getAllRooms,
  getRoomById,
  addRoom,
} = require('../controller/roomController');

const router = express.Router();

//get all rooms

router.route('/').get(getAllRooms);

//getRoomById
router.route('/room/:id').get(getRoomById);

router.route('/addRoom').post(addRoom);

module.exports = router;
