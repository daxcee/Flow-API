var crypto = require('crypto');

exports.modules = {

    generateToken:function(){
        return  crypto.randomBytes(64).toString('hex');
    }

};