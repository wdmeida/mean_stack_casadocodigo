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
angular.module('contatooh').controller('ContatosController', function($scope, $http) {

  $scope.contatos = [];

  $scope.total = 0;

  $scope.filtro = '';

  $scope.incrementa = function() {
    $scope.total++;
  };

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
  */
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
});
