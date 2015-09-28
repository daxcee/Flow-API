require('dotenv').load();

module.exports = {
    db_uri:'mongodb://' + process.env.LOCAL_HOST + ':' + process.env.LOCAL_DBPORT + '/' + process.env.DB_NAME,
    app_url:process.env.APP_URL,
    ms_user:process.env.MS_USER,
    ms_pass:process.env.MS_PASSWORD,
    ms_host:process.env.MS_HOST,
    apikey:process.env.APIKEY,
    fb_app_id:process.env.FB_APP_ID,
    fb_app_secret:process.env.FB_APP_SECRET,
    fb_callback_url:process.env.FB_CALLBACK_URL,
    test_app_url:process.env.TEST_APP_URL
};