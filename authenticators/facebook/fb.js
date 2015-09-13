require('dotenv').load();

// facebook app settings - fb.js
module.exports = {
    'appID' : process.env.FB_APP_ID,
    'appSecret' : process.env.FB_APP_SECRET,
    'callbackUrl' : 'http://localhost:3000/login/facebook/callback'
};