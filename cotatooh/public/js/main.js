/*
  AngularJS disponibiliza o objeto angular globalmente. É através dele que acessamos
  vários recursos do framework, inclusive o de criação de módulos, justamente aquele
  que precisamos.

  Criamos um módulo através da função angular.module. Ela recebe dois parâmetros: o primeiro
  é o nome do módulo; o segundo, um array com todas as suas dependências. Não temos nenhuma
  dependência por enquanto, ainda assim, precisamos passar o array vazio como parâmetro.
*/
angular.module('contatooh', []);
