//Módulo de configuração do Express.
var express = require('express');
//Importa o módulo passando como parâmetro a instância configurada do Express.
var home = require('../app/routes/home');

module.exports = function() {
  var app = express();
  // variável de ambiente
  app.set('port', 3000);
  //  middleware
  app.use(express.static('./public'));

  // Define o template engine que sera usado para gerar as views e onde ficarão armazenadas.
  app.set('view engine', 'ejs');
  app.set('views', './app/views');

  home(app);

  return app;
};
