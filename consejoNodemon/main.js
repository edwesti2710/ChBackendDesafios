const {promises : fs} = require('fs');

fs.appendFile('hola.json', 'x');

/**
Con este comando, hacemos que nodemon se fije solo en esos archivos para hacer los dev test
nodemon -e 'js,html,handlebars' index.js
 */