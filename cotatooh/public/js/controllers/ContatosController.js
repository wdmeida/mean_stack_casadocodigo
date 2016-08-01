/*
  O sistema de injeção de dependências do AngularJS é baseado no nome do parâmetro, logo,
  se usarmos qualquer outro nome, o framework não será capaz de injetá-lo em nosso controller.

  O $scope é um Plain Old Javascript Object (POJO), logo, podemos adicionar propriedades dinamicamente
  e o mais fantástico é que elas serão acessíveis pela view através de AE.

  O AngularJS possui o serviço $http responsável por requisições Ajax. Injetamos este serviço em nossos
  controllers como qualquer outro artefado do framework.
  O serviço $http recebe como parâmetro um objeto com as configurações da requisição.
  {
    method: //Método utilizado, pode ser GET, POST, PUT ou DELETE
    url: //Endereço do recurso acessado.
    data: //Objeto no qual cada propriedade será um parâmetro na requisição.
  }
*/
angular.module('contatooh').controller('ContatosController', function($scope, $resource) {

  $scope.contatos = [];

  $scope.filtro = '';

  /*
    O $http não retorna a lista de contatos, mas uma promise (promessa) de que ele tentará
    buscar esses dados.
    Uma promise é um objeto que fornecerá o resultado futuro de uma ação. Ela possui três estados e,
    dependendo desses estados, ações são executadas:

      fullfilled: quando a promise é bem-sucedida;
      rejected: quando a promise é rejeitada;
      failed: quando não é nem bem-sucedida nem rejeitada.

    * Uma promise que foi fulfilled ou rejected não pode ser fullfilled ou rejected novamente.

    Uma promise possui o método then, que recebe como parâmetros callbacks. O primeiro é
    executado quando o status da promise for fullfilled; o segundo, para os estados rejected
    e failed.
    O AngularJS introduz a função catch, que permite isolar o callback dos estados rejected e failed.
    No retono temos acesso a propriedades especiais que nos permitem acessar os dados retornados, inclusive
    obter mensagens de erro enviadas pelo servidor:

      data: o body da resposta transformado e pronto para usar;
      status: número que indica o status HTTP da resposta;
      statusText: texto HTTP da resposta.

    Ainda é possível ter acesso ao objeto header e config, este último com as configurações utilizadas na
    requisição.

  //Faz a requisição aos dados no servidor.
  $http.get('/contatos')
    //Caso os requisição seja concluída com sucesso.
    .success(function(data) {
        $scope.contatos = data;
    })
    //Caso ocorra algum erro...
    .error(function(statusText) {
      console.log("Não foi possível obter a lista de contatos.");
      console.log(statusText);
    });
    */

    /*
      AngularJS possui um serviço de mais alto nível chamado $resource, específico para consumir
      REST Endpoints.
      O serviço $resource nos devolve um objeto que permite realizar uma série de operações seguindo
      o padrão REST para o recurso /contatos. O nome da variável está em maiúscula, algo intencional
      para diferenciá-lo de uma possível variável que represente o model para contato.
      Nosso objetivo é realizar uma consulta ao nosso serviço e obter a lista de contatos. Para esta
      finalidade, existe a função query. A função, por debaixo dos panos, monta uma requisição do tipo
      GET para o recurso /contatos em nosso servidor. E como estamos trabalhando com uma requisição
      assíncrona, podemos pedir que ela nos devolva uma promise.

            var Contato = $resource('/contatos').$promise;

      No lugar de recebermos uma promise, podemos passar para a função query duas funções: a primeira, um
      callback de sucesso; e a segunda, um callback de erro.
    */

    var Contato = $resource('/contatos/:id');

    function buscaContatos() {
      Contato.query(
        //Callback executado caso a requisição sejá executada com sucesso.
        function(contatos) {
          $scope.contatos = contatos;
        },
        //Callback executado caso haja erro na requisição.
        function(erro) {
          console.log("Não foi possível obter a lista de contatos");
          console.log(erro);
        }
      );
    }

    buscaContatos();


      /*
        Além do primeiro parâmetro na função delete, que indica os parâmetros da requisição, podemos
        passar mais dois: o primeiro, um callback de sucesso; o segundo um callback de falhar, deixando
        a nossa função menos verbosa. Abaixo comentada esta a versão original.

      1ª versão.

      var promise = Contato.delete({id: contato._id}).$promise;
      promise
        .then(buscaContato)
        .catch(function(erro) {
          console.log("Não foi possível remover o contato");
          console.log(erro);
        });
        */
    $scope.remove = function(contato) {
      Contato.delete({id: contato._id},
                      buscaContatos,
                      function(erro) {
                        console.log("Não foi possível remover o contato.");
                        console.log(erro);
                      }
                    );
    };
});
