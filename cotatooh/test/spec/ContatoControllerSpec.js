/*
  O Jasmine nos permite criar suítes de testes através da função describe disponibilizada pelo próprio framework.
  A função recebe dois parâmetros: o primeiro é a descrição de nossa suíte e o segundo é uma função que conterá
  uma série de testes que no Jasmine são chamados de Specs.

  O nome da suíte é tipicamente o nome da classe, função ou componente que desejamos testar. É o nome da suíte que
  será exibido com o resultado de seus testes no terminal. Nosso próximo passo será definir os comportamentos de
  ContatoController que desejamos testar.
*/

describe("ContatoController", function() {

  var $scope;

  /*
    O Jasmine possui a função beforeEach sempre chamada antes da execução de cada uma de nossas Specs.
    Carregaremos através da função module o módulo principal de nossa aplicação.
  */
  beforeEach(function() {
    module('contatooh');
    /*
      O serviço $injector permie instanciar outros artefatos do AngularJS que não sejam serviços. É através
      de $injector.get('$rootScope') que temos acesso à definição de $rootScope, mas estamos interessados em uma
      instância desta definição que criamos encadeando uma chamada à função $injector.get('$rootScope').$new().
    */
    inject(function($injector) {
      $scope = $injector.get('$rootScope').$new();
    })
  });

  /*
    Dentro de nossa suíte, criaremos uma afirmativa, nossa Spec, sobre nosso objeto ContatoController
    através da função it.

    O primeiro parâmetro, nossa afirmação, deixa claro para quem está lendo o código o que estamos esperando,
    mas é o comportamento definido na função passada como segundo parâmetro que testará essa expectativa.

    Para que possamos acessar controllers dentro de nossos testes, substituíremos o callback da função it por
    uma chamada à função inject, disponibilizada pelo Angular-Mocks. Podemos pedir à função inject qualquer
    artefato injetável do AngularJS. O problema disso é que controllers não podem ser injetados, apenas serviços.
    Teremos que utilizar o serviço $controller do módulo Angular-Mocks, que possui a responsabilidade de instanciar
    controllers.
  */
  it("Deve criar um Contato vazio quando nenhum parâmetro de rota for passado",  inject(function($controller) {

    /*
      Repare que, nesse exemplo, a função expect recebe como parâmetro o _id do contato presente no escopo
      de ContatosController. Em seguida, encadeamos a chamada da função toBeUndefined, isto é, para que nosso
      teste passe, o _id do contato deve ser undefined. Sabemos que isso deve acontecer quando nenhum parâmetro
      de rota for passado par ao controller, exatamente a descrição da função it. O serviço $controller recebe
      como segundo parâmetro, um objeto cuja chaves representam os artefatos injetados que desejamos substituir.
    */
    $controller('ContatoController', {"$scope" : $scope});
    expect($scope.contato._id).toBeUndefined();
  }));
});
