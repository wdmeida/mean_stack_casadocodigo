/*
  AngularJS disponibiliza o objeto angular globalmente. É através dele que acessamos
  vários recursos do framework, inclusive o de criação de módulos, justamente aquele
  que precisamos.

  Criamos um módulo através da função angular.module. Ela recebe dois parâmetros: o primeiro
  é o nome do módulo; o segundo, um array com todas as suas dependências. Não temos nenhuma
  dependência por enquanto, ainda assim, precisamos passar o array vazio como parâmetro.
*/
angular.module('contatooh', ['ngRoute'])
  /*
    A configuração das rotas da aplicação costuma ser feita no módulo principal da aplicação, ou seja,
    no arquivo main.js. Utilizamos a função config, que recebe uma função que tem como parâmetro um
    artefato injetado pelo AngularJS responsável pela criação de rotas, o objeto $routeProvider. Caso
    não tivéssemos importado o módulo ngRoute, ele não estaria disponível para injeção.
  */
    .config(function($routeProvider) {

      /*
        O objeto $routeProvider possui a função when. Nela informamos a rota (sem o #) e no segundo parâmetro
        um objeto que define qual template (partial) será carregado para a rota e qual será seu controller
        atráves das propriedades templateURL e controller, respectivamente.
      */
      $routeProvider.when('/contatos', {
        templateUrl: 'partials/contatos.html',
        controller: 'ContatosController'
      });

      $routeProvider.when('/contato/:contatoId', {
        templateUrl: 'partials/contato.html',
        controller: 'ContatosController'
      });

      /*
        Podemos adicionar uma rota padrão caso o endereço da rota não exista. Fazemos isso através da função
        $routeProvider.otherwise. Nela passamos um objeto com a propriedade redirectTo, que aponta para uma
        rota alternativa, em nosso caso, aquela que lsita os contatos.
      */
      $routeProvider.otherwise({redirectTo: '/contatos'});
    });
