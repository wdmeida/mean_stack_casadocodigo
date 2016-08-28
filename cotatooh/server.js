var http = require('http');
var express = require('express');
var app = require('./config/express')();
//Carrega o módulo de configuração do Passport imediatamente após a configuração do Express.
require('./config/passport')();
//Realiza a conexão com a base de dados.
require('./config/database.js')('mongodb://localhost/contatooh');

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express Server escutando na porta ' +
              app.get('port'));
});
