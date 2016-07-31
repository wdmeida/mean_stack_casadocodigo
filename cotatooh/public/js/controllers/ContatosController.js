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

  $scope.total = 0;

  $scope.incrementa = function() {
    $scope.total++;
  };

  /*
    O $http não retorna a lista de contatos, mas uma promise (promessa) de que ele tentará
    buscar esses dados.
    Uma promise é um objeto que fornecerá o resultado futuro de uma ação.
  */ 
  var promise = $http({method: 'GET', url: '/contatos'});

  $scope.contatos = [
    {
      "_id": 1,
      "nome": "Contato Angular 1",
      "email": "cont1@empresa.com.br"
    },
    {
      "_id": 2,
      "nome": "Contato Angular 2",
      "email": "cont2@empresa.com.br"
    },
    {
      "_id": 3,
      "nome": "Contato Angular 3",
      "email": "cont3@empresa.com.br"
    }
  ];

  $scope.filtro = '';
});
