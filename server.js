const express = require('express');
const cors = require('cors');
const cookieSession = require("cookie-session");
const connectDB = require('./database-connection'); 
const { verifyToken } = require('./auth'); 
const router = require('./router'); 
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(
  cookieSession({
    name: "luana-session",
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
  })
);

connectDB();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
