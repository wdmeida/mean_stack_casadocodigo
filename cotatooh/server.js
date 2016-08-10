var http = require('http');
var app = require('./config/express')();
//Realiza a conexão com a base de dados.
require('./config/database.js')('mongodb://localhost/contatooh');

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express Server escutando na porta ' +
              app.get('port'));
});
