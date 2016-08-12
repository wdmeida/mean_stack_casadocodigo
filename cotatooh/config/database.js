var mongoose = require('mongoose');

/*
  A idéia é que nossa conexão seja iniciada com o servidor. É por isso que chamaremos
  nosso módulo database.js através de nosso server.js.
*/
module.exports = function(uri) {
  /*
    A função connect cria uma conexão padrão acessível pelos models criados pelo Mongoose. Para nossa
    aplicação, isso será suficiente, porém há aplicações que acessam mais de um banco. Para isso, existe
    a função createConnection, que retorna a conexão com o banco:

      var connection = mongoose.createConnection(uri);

    Entretando, quando criamos conexões dessa forma, somos responsáveis em associá-las aos modelos criados
    pelo Mongoose. Outro ponto é que você terá que garantir que ninguém criaŕa duas conexões para o mesmo
    banco:

      var mongoose = require('mongoose');
      var connection;
      module.exports = function(uri) {
          if(!connection) {
            connection = mongoose.createConnection(uri);
        }
        return connection;
      }

      A função mongoose.connect cria por padrão um pool com cinco conexões, porém esta quantidade pode não
      ser adequada para todas as aplciações. Podemos alterar esta quantidade passando uma configuração extra
      para a função:

        mongoose.connect(uri, { server: { poolSize: 15 } });
  */
  mongoose.connect(uri);

  //Habilita o debbuger do mongo.
  mongoose.set('debug', true);

  /*
    Poderíamos até subir nossa aplicação, porém não teríamos nenhuma informação sobre o estado da
    conexão. Podemos resolver este problema através dos eventos connected, disconnected e error
    disparados pela conexão. Basta passarmos um callback para cada um deles com as informações
    que queremos exibir no console.
  */

  mongoose.connection.on('connected', function() {
    console.log("Mongoose! Conectado em " + uri);
  });

  mongoose.connection.on('disconnected', function() {
    console.log("Mongoose! Desconectado de " + uri);
  });

  mongoose.connection.on('error', function(erro) {
    console.log("Mongoose! Erro na conexão: " + erro);
  });

  /*
    Precisamos garantir que a conexão seja fechada quando nossa aplicação for terminada. Vamos interagir
    com o objeto "process" globalmente disponível pelo Node.js e acessível em qualquer local de nossa aplicação.
    O objeto "process" possui um evento SIGINIT disparado quando nossa aplicação é terminada. É através do
    callback associado a este evento que pediremos ao Mongoose que feche nossa conexão através da função close.
  */
  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log("Mongoose! Desconectado pelo término da aplicação");
      // O indica que a finalização ocorreu sem erros.
      process.exit(0);
    });
  });
}
