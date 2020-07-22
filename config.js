require('dotenv').config();

const config = {
    accessToken: process.env.ACCESS_TOKEN,
    verifyToken: process.env.VERIFY_TOKEN,
};

module.exports = config;
