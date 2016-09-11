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
//Importa o Helmet que possui middlewares de tratamento de header já prontos, tornando a aplicação mais segura.
var helmet = require('helmet');


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

  app.use(helmet());

  //Para desabilitar a informação sobre a tecnologia utilizada no cabeçalho basta desabitar o serviço:
  //app.disable('x-powered-by');
  //Ao invés de desabilitar, você pode mascarar a informação dificultando a vida do potencial invasor.
  //Forneceremos uma informação falsa através do middleware helmet.hidePoweredBy.
  app.use(helmet.hidePoweredBy({setTo: 'PHP 5.5.14'}));
  /*
    Nem sempre você quer que sua aplicação seja colocada dentro de um <frame> ou <iframe>, evitando possíveis
    ataques do tipo clickjacking. Esse ataque disponibiliza um <iframe> invisível ou redimensionado contendo a
    página que o atacante quer que visitemos sem saber, porém ele é colocado sobre algum elemento da página como
    links e botões aparentemente inofensivos. Quando clicarmos sobre o link ou botão, estaremos executando um
    código da página do <iframe> e não da página no qual nos encontramos.
    Através do middleware helmet.xframe que evitamos que nossas páginas sejam referenciadas por <frame> ou <iframe>.
  */
  app.use(helmet.xframe());
  /*
    Um exemplo clássico de XSS (cross-site-scripting) envolve o post de um blog. Alguém, com a intenção velada de
    prejudicar outra pessoa, adiciona em seu post a tag <script> que aponta para um script malicioso. Quando o post
    for visualizado (um que não foi sanitizado previamente) no navegador, a tag indevidamente será processada. Uma
    solução parcial para o problema é utilizar o middleware helmet.xssFilter.

    Esse código adiciona o header http X-XSS-Protection originalmente criado pela Microsoft. A Google gostou tanto da
    ideia que mais tarde adicionou o suporte deste header ao Chrome. O header solicita ao navegador a ativação de uma
    proteção especial contra XSS. Há suporte apenas ao IE9+ e Chrome, sendo desabilitado para outros navegadores,
    principalmente os mais antigos.
  */
  app.use(helmet.xssFilter());
  /*
    Alguns navegadores permitem carregar através das tags link e script arquivos que não sejam dos MIME types
    text/css e text/javascript, respectivamente.
    Porém, se no header de resposta houver o X-Content-Type-Options: nosniff o navegador não permitirá esse abuso.
  */
  app.use(helmet.nosniff());

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

  //Se nenhuma rota atender, direciona para página 404.
  app.get('*', function(req, res) {
    res.status(404).render('404');
  });

  return app;
};
