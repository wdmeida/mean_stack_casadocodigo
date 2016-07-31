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

});
