//Módulo de configuração do Express.
var express = require('express');
//Importa o módulo passando como parâmetro a instância configurada do Express.
//var home = require('../app/routes/home');
//Importa o módulo do Express-load responsável por gerenciar o carregamento de módulos.
var load = require('express-load');
var bodyParser = require('body-parser');
//Importa os módulos para trabalhar com sessões (respectivamente cookie-parser e express-session).
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');


module.exports = function() {
  var app = express();
  // variável de ambiente
  app.set('port', 3000);

  //  middlewares
  // Define o template engine que sera usado para gerar as views e onde ficarão armazenadas.
  app.set('view engine', 'ejs');
  app.set('views', './app/views');
  app.use(express.static('./public'));

  /*
    Solicita ao bodyParser que realize o parse de json e requisições com o corpo
    x-ww-form-urlencoded. Isso permite acessar os dados da requisição através de
    req.body, algo que veremos na prática mais tarde.
  */
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(require('method-override')());

  /*
    O middleware cookieParser realiza o parser do header de cookies da requisição populando req.cookies e
    armazena o ID da sessão. O segundo middleware session cria por padrão a sessão do usuário em memória.
    Ele recebe três parâmetros:

      secret: o cookie de sessão é assinado com este segredo para evitar adulteração.
      resave: garante que as informações da sessão serão acessíveis através de cookies a cada requisição.
      saveUninitialized: essa opção soluciona problemas que envolvem a requisição de uma permissão antes de
                       atribuir um cookie.

    Quando usamos Express, precisamos chamar a função passport.initialize para inicializar o Passport. Como
    nossa aplicação usa sessões de login persistentes, também precisamos utilizar o middleware passport.session.
    Um ponto a destacar é que a inicialização da sessão do Express deve vir sempre antes de passport.session para
    garantirmos que a sessão de login seja restaurada na ordem correta.
  */
  app.use(cookieParser());
  app.use(session(
    { secret: 'homem avestruz',
      resave: true,
      saveUninitialized: true
    }
  ));
  app.use(passport.initialize());
  app.use(passport.session());

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
      .then('routes/auth.js')
      .then('routes')
      .into(app);

  return app;
};
