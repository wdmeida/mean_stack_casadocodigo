/*
  O sistema de injeção de dependências do AngularJS é baseado no nome do parâmetro, logo,
  se usarmos qualquer outro nome, o framework não será capaz de injetá-lo em nosso controller.

  O $scope é um Plain Old Javascript Object (POJO), logo, podemos adicionar propriedades dinamicamente
  e o mais fantástico é que elas serão acessíveis pela view através de AE.
*/
angular.module('contatooh').controller('ContatosController', function($scope) {

  $scope.total = 0;

  $scope.incrementa = function() {
    $scope.total++;
  };

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
