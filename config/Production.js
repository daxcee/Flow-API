require('dotenv').load();

module.exports = {
    db_uri:'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME,
    app_url:process.env.APP_URL,
    ms_user:process.env.MS_USER,
    ms_pass:process.env.MS_PASSWORD,
    ms_host:process.env.MS_HOST,
    fb_app_id:process.env.FB_APP_ID,
    fb_app_secret:process.env.FB_APP_SECRET,
    fb_callback_url:process.env.FB_CALLBACK_URL
};