angular.module('contatooh').controller('ContatoController',
  //Repare na troca da injeção $resource pelo nome de nosso serviço, Contato.
  ["$scope", "$routeParams", "Contato", function($scope, $routeParams, Contato) {

    /*A rota continua no plural, pois é a rota no lado do servidor.
    var Contato = $resource('/contatos/:id');
    */

    /*
      Realiza a busca apenas se o ID do contato for passado para o sistema de rotas do AngularJS
      e caso não haja o id, adiciona um objeto sem propriedades em $scope.contato. Isso não dará
      erro, porque o two-way data binding criará as propriedades dinamicamente no objeto caso elas
      não existam, através da diretiva ng-model.
    */
    if ($routeParams.contatoId) {
      Contato.get({id: $routeParams.contatoId},
                function(contato) {
                  $scope.contato = contato;
                },
                function(erro) {
                  $scope.mensagem = {
                    texto: 'Contato não existe. Novo contato.'
                  };
                }
              );
    } else {
      $scope.contato = new Contato();
    }

    $scope.salva = function() {
      /*
        Trabalhar com o $resource possui várias vantagens. Qualquer objeto retornado através dele é
        incrementado com uma série de funções voltadas para persistência, em nosso caso, persistência
        ligada a REST Endpoints.
        A função $save gera por debaixo dos panos uma requisição do tipo post que envia os dados do
        contato. E se quisermos exibir uma mensagem de sucesso, a função retorna uma promise.
      */
      $scope.contato.$save()
          .then(function () {
            $scope.mensagem = { texto: 'Salvo com sucesso.' };
            //limpa o formulário.
            $scope.contato = new Contato();
          })
          .catch(function(erro) {
            $scope.mensagem = { texto: 'Não foi possível salvar.'};
          });
    };

    Contato.query(function(contatos) {
      $scope.contatos = contatos;
    });
  }]);
