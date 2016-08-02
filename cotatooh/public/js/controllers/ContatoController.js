angular.module('contatooh').controller('ContatoController',
  function($scope, $routeParams, $resource) {

    //A rota continua no plural, pois é a rota no lado do servidor.
    var Contato = $resource('/contatos/:id');

    Contato.get({id: $routeParams.contatoId},
              function(contato) {
                $scope.contato = contato;
              },
              function(erro) {
                $scope.mensagem = {
                  texto: 'Não foi possível obter o contato.'
                };
                console.log(erro);
              }
            );
  });
