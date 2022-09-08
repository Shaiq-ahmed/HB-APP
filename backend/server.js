const express = require('express');
const databaseConnection = require('./connection/db');
const dotenv = require('dotenv');
const roomRoutes = require('./routes/roomRoute');
const userRoutes = require('./routes/userRoute');
// const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/bookRoute');
const path = require('path');

const cookieParser = require('cookie-parser');

const app = express();

dotenv.config({ path: 'backend/config/config.env' });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

__dirname = path.resolve();
if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'staging'
) {
  app.use(express.static(path.join('/client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//databaseConnection
databaseConnection();

app.use('/api', roomRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is running on ${port} `);
});
