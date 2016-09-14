/*
  O Jasmine nos permite criar suítes de testes através da função describe disponibilizada pelo próprio framework.
  A função recebe dois parâmetros: o primeiro é a descrição de nossa suíte e o segundo é uma função que conterá
  uma série de testes que no Jasmine são chamados de Specs.

  O nome da suíte é tipicamente o nome da classe, função ou componente que desejamos testar. É o nome da suíte que
  será exibido com o resultado de seus testes no terminal. Nosso próximo passo será definir os comportamentos de
  ContatoController que desejamos testar.
*/

describe("ContatoController", function() {
  /*
    Dentro de nossa suíte, criaremos uma afirmativa, nossa Spec, sobre nosso objeto ContatoController
    através da função it.

    O primeiro parâmetro, nossa afirmação, deixa claro para quem está lendo o código o que estamos esperando,
    mas é o comportamento definido na função passada como segundo parâmetro que testará essa expectativa.
  */
  it("Deve criar um Contato vazio quando nenhum parâmetro de rota for passado",  function() {

    /*
      Repare que, nesse exemplo, a função expect recebe como parâmetro o _id do contato presente no escopo
      de ContatosController. Em seguida, encadeamos a chamada da função toBeUndefined, isto é, para que nosso
      teste passe, o _id do contato deve ser undefined. Sabemos que isso deve acontecer quando nenhum parâmetro
      de rota for passado par ao controller, exatamente a descrição da função it.
    */
    expect($scope.contato._id).toBeUndefined();
  });
});
