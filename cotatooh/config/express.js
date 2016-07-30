//Módulo de configuração do Express.
var express = require('express');
//Importa o módulo passando como parâmetro a instância configurada do Express.
//var home = require('../app/routes/home');
//Importa o módulo do Express-load responsável por gerenciar o carregamento de módulos.
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function() {
  var app = express();
  // variável de ambiente
  app.set('port', 3000);
  //  middleware
  app.use(express.static('./public'));

  /*
    Solicita ao bodyParser que realize o parse de json e requisições com o corpo
    x-ww-form-urlencoded. Isso permite acessar os dados da requisição através de
    req.body, algo que veremos na prática mais tarde.
  */
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(require('method-override')());

  // Define o template engine que sera usado para gerar as views e onde ficarão armazenadas.
  app.set('view engine', 'ejs');
  app.set('views', './app/views');

  /*
    A função load carregará todos os scripts dentro das pastas app/models, app/controllers
    e app/routes. No final, a função into adiciona dinamicamente na instância do Express
    propriedades que apontam para esses módulos.

    Um ponto importante é que precisamos carregar as pastas seguindo a ordem models, controllers
    e routes, caso contrário não conseguiremos, por exemplo, ter acesso aos nossos controllers
    em nossas rotas caso os módulos com nossos controllers tenham sido carregados por último.

    O parâmetro {cwd: 'app'} foi necessário para mudar o diretório padrão, pois a função procura
    as pastas no diretório raiz contatooh e precisamos que ela considere a pasta contatooh/app.
  */
  load('models', {cwd: 'app'})
      .then('controllers')
      .then('routes')
      .into(app);

  return app;
};
