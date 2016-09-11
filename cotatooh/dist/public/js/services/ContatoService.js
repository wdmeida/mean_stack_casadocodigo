/*
  Utilizando a instância de nosso módulo principal, utilizamos a função factory, que recebe como
  primeiro parâmetro o nome do serviço e, no segundo, a função que o define. Repare que na função
  temos como dependência $resource.
  O nosso serviço retorna uma instância de $resource já configurada e pronta para uso. Todo serviço
  criado com factory deve retornar um objeto.
*/
angular.module('contatooh').factory('Contato', function($resource) {
    return $resource('/contatos/:id');
});
