var fs = require('fs');

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'controllerLoader.js')
    })
    .forEach(function(file) {
        module.exports[file.replace(/\.js$/, '')] = require('./' + file);
    });