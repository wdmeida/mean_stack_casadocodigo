//Importa o controller em nosso arquivo de rotas.
var controller = require('../controllers/home')();
/*
  Como as configurações de rotas são aplicadas diretamente na instância do Express, nosso
  módulo precisa receber essa instância como parâmetro.
*/
module.exports = function(app) {
  app.get('/index', controller.index);
  app.get('/', controller.index);
}
