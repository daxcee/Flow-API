function statusChangeCallback(response) {
    if (response.status === 'connected') {

        var token = FB.getAuthResponse()['accessToken'];
        //var userId = response.authResponse.userID;

        if(sessionStorage.getItem("flow-token") == null ) {
            sessionStorage.setItem("flow-token", token);
        }

        registerUser(token, function (res){
            console.log('callb: regis user: ' + res);
            //if(res.id === userId.toString()){
                FB.api('/me', function(response) {
                    document.getElementById('status').innerHTML =
                        'Logged in as: ' + response.name;
                });
            //}
        });

    } else if (response.status === 'not_authorized') {
        sessionStorage.clear();
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    } else {
        sessionStorage.clear();
        document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '564699977011605',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.4'
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function registerUser(token, callback) {
    var basePath = '/api/v1';
    var endpoint = '/authenticate';
    var requestURL = 'http://flow-api.herokuapp.com' + basePath + endpoint;

    $.ajax({
        url: requestURL,
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("authorization", token);
        },
        success: function(data) {
            callback(data)
        }
    });
}

function doRequest(uri){
    window.location.replace(uri + '?token=' + sessionStorage.getItem("flow-token"));
}