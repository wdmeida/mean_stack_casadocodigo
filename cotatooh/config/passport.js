/*
  Utilizaremos como estratégia de autenticação uma instância de GitHubStrategy que recebe dois parâmetros.
  O primeiro é um objeto com as chaves clientID, clientSecret, callbackURL com seus respectivos valores
  disponibilizados na configuração de nossa aplicação no GitHub. O segundo parâmetro é um callback que será
  chamado apenas uma vez quando o usuário se autenticar.
*/
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var findOrCreate = require('mongoose-findorcreate');
var mongoose = require('mongoose');

module.exports = function() {

  var Usuario = mongoose.model('Usuario');
  /*
    Repare que o callback recebe quatro parâmetros, mas o que realmente nos interessa são os dois últimos: profile
    e done. O primeiro é um objeto que representa o perfil do usuário do GitHub. O segundo, uma função de callback que
    deve receber como parâmetro os dados que queremos mais tarde armazenar na sessão.
  */
  passport.use(new GitHubStrategy({
    clientID: 'b9a2cee5648a734a8fd5',//'SEU CLIENT ID'
    clientSecret: 'cc104b6e6522fcfca4740cc64cf7cc0bdf1d9403',//'SEU CLIENT PASSWORD'
    callbackURL: 'http://localhost:3000/auth/github/callback' //'SUA REDIRECT_URI'
  }, function(accessToken, refreshToken, profile, done) {

      /*
        A função Usuario.findOrCreate recebe como primeiro parâmetro profile.username do GitHub, nosso critério de
        busca. O usuário será retornado caso o critério seja atendido, caso contrário, será adicionado um novo em
        nosso banco, porém o padrão é incluir apenas a chave do critério de busca como informação. É por isso que
        adicionamos o segundo parâmetro, que contém os dados complementares, em nosso caso, apenas a chave nome,
        que receberá também como valor o profile.username do GitHub. No final, passamos o usuário que veio do nosso
        banco para a função done.
      */
      //O plugin findOrCreate não tem suporta a promise.
      Usuario.findOrCreate(
        { "login" : profile.username },
        { "nome" : profile.username },
        function(erro, usuario) {
          if(erro){
            return done(erro);
          }
          return done(null, usuario);
        }
      );
  }));

  /*
    Chamado apenas UMA vez e recebe o usuário do nosso banco, disponibilizado pelo callback da estratégia
    de autenticação. Realizará a serialização apenas do ObjectId do usuário na sessão.
    Não queremos correr o risco de onerar a memória do servidor guardando informações desnecessárias, motivo
    pelo  qual serializaremos apenas o ObjectId do usuário na sessão. Esse processo é realizado através da
    função passport.serializeUser, que recebe dois parâmetros. O primeiro é o usuário que foi passado pela
    estratégia de autenticação. O segundo, uma função que receba a informação do usuário que desejamos
    serializar na sessão.
  */
  passport.serializeUser(function(usuario, done) {
    done(null, usuario._id);
  });

  /*
    Toda vez que precisarmos acessar outras informações do usuário em nossos controllers, será necessário
    buscá-lo no banco através de seu ObjectId. A boa notícia é que podemos delegar esse processo de desserialização
    ao Passport.
    Em cada requisição, o Passport chamará sua função de desserialização passando como parâmetro o ObjectId do usuário
    armazenado na sessão. Usaremos essa informação para buscar o usuário no banco, inclusive o Passport disponibilizará
    o usuário encontrado em cada request através da chave req.user, rornando-o facilmente acessível em nossos controllers.
  */
  passport.deserializeUser(function(id, done) {
    Usuario.findById(id).exec()
      .then(function(usuario) {
        done(null, usuario);
      });
  });
};
