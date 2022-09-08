const mongoose = require('mongoose');

const mongoURL =
  'mongodb+srv://bingo:Spyprogrammer123@cluster0.cz7xe.mongodb.net/mern-hotelbooking';

const databaseConnection = () => {
  mongoose.connect(mongoURL, { useNewUrlParser: true }).then((data) => {
    console.log(`mongodb is connected to the server: ${data.connection.host}`);
  });
};

module.exports = databaseConnection;
