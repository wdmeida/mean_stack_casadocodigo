var passport = require('passport');
/*
  Ainda falta definirmos as rotas envolvidas no processo de autenticação, principalmente aquela que
  protegerá nossos recursos. É o que faremos neste arquivo.
*/

module.exports = function(app) {
  /*
    A primeira rota /auth/github redirecionará o usuário para a página de login do GitHub enviando por baixo
    dos panos o CLIENT ID da aplicação. Repare que utilizamos como controller o retorno da função
    passport.authenticate('github'), que saberá lidar com a requisição.
    A segunda rota /auth/github/callback possui o mesmo identificador que cadastramos como Authorization
    callback URL no GitHub. Quando o usuário se logar, o GitHub chamará a rota passando o CÓDIGO DE AUTORIZAÇÃO.
    Com o código recebido, o Passport se comunicará por baixo dos panos com o SERVIDOR DE AUTENTICAÇÃO que protege
    o profile do usuário no GitHub, solicitando o CONSENTIMENTO DE AUTORIZAÇÃO para daí acessar o profile. Se a
    autenticação for bem-sucedida, o usuário será redirecionado para nossa aplicação Contatooh.
  */
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback',
            passport.authenticate('github',{
            successRedirect: '/'
          }));

  /*
    Precisamos redirecionar para página de login qualquer usuário não autenticado.
    O Passport convenientemente disponibiliza na requisição a função isAuthenticated, que no permite saber
    em nossos controllers se o usuário está autenticado ou não. Se ele estiver autenticado, deixaremos que
    as próximas rotas definidas sejam processadas, caso contrário, ele será redirecionado para uma página
    com apenas o link "Entre no GitHub". Essa página será uma view ejs, logo, só poderá ser acessada através
    de uma rota específica.
  */
  app.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
      //Permite que outras rotas sejam processadas.
      return next();
    } else {
      //renderiza auth.ejs
      res.render('auth');
    }
  });
};
