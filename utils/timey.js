module.exports = {

    getTimeDifferenceFromNow: function (utcSeconds) {

        var tokenExpiration = new Date(utcSeconds * 1000);

        var currentTime = new Date();
        //Wed Sep 09 2015 15:55:50 GMT+0200 (CEST) --- Sat Nov 07 2015 01:32:37 GMT+0100 (CET)
        var differenceInSeconds =  Math.floor((tokenExpiration - currentTime) / 1000);
        console.log('time diff: ' + differenceInSeconds + 'seconds' );

        return differenceInSeconds
    }

};