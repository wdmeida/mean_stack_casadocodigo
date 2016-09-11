var sanitize = require('mongo-sanitize');

module.exports = function(app) {
  //Obtêm uma referência ao Model disponível na instância do Express passada como parâmetro para o módulo.
  var Contato = app.models.contato;

  var controller = {};

  controller.listaTodos = function(req, res) {
    /*
      Existem diferentes maneiras de realizarmos essa consulta, porém a função find pode retornar uma
      promise através da chamada encadeada à função exec. Toda promisse em AngularJS possui a função then.
      Isso não é diferente com a promise do Mongoose, mas ela não possui a função catch. Vamos passar os
      callbacks de sucesso e de falha para a função then e omitiremos a declaração da variável promise.

      Quando definimos uma referência em nosso esquema, apenas damos uma pista para o Mongoose de como ele
      deve buscá-la, porém temos que explicitar isso em nosso código através da função populate.

      Em nosso controller, temos a função listaTodos. Nela, utilizados a função Contato.find para listar todos
      os contatos cadastrados e que, no final, retorna uma promise através da chamada à função exec. Precisamos
      chamar populate antes de retornarmos a promise, isto é, antes da chamada à exec.

      Repare que passamos para a função populate a referência que o Mongoose deverá resolver. No final, cada
      contato de nossas lista, no lugar do ObjectId da sua emergência, conterá a emergência inteira como um
      embedded document.
    */
    Contato.find().populate('emergencia').exec()
      .then(
        //Callback de sucesso.
        function(contatos){
          res.json(contatos);
        },
        //Callback de erro.
        function(erro){
          console.error(erro);
          res.status(500).json(erro);//Erro interno do servidor (cod 500).
        }
      );
  };

  controller.obtemContato = function(req, res) {
    var _id = req.params.id;

    /*
      Caso o ID procurado não exista no banco, receberemos undefined como resposta. Neste caso, lançaremos
      uma exceção informando que o contato não foi encontrado. Como estamos usando o padrão promisse, nosso
      callback de erro será invocado recebendo a exceção que lançadmos. Depois de lançarmos o erro, enviamos
      como resposta o status 404, junto do JSON com a mensagem de erro. Se tudo corre bem, enviamos o contato
      como resposta através de res.json.
    */
    Contato.findById(_id).exec()
      .then(
        function(contato) {
          if (!contato) throw new Error("Contato não encontrado!");
          res.json(contato);
        },
        function(erro){
          console.log(erro);
          res.status(404).json(erro);
        }
      );
  };

  controller.removeContato = function(req, res) {
    /*
      Nossa API espera receber como parâmetro uma string contendo o ObjectId do contato. Caso seja passado
      como parâmetro um objeto com o query selector $ne (por exemplo, { "$ne" : null }), poderia ser resultado
      na remoção de todos os contatos de nosso banco. Essa estratégia pode ser utilizada em outros lugares que
      esperam um critério de consulta.
      Para solucionarmos o problema de injeção através de query selectors, devemos aceitar apenas strings como
      critério. Porém, se recebermos um objeto, basta remover qualquer chave que contenha $ como valor. Há um
      projeto que realiza essa verificação pra nós, o mongo-sanitize.
    */
    //Sanitiza o id para que sejam removidas chaves que contenham query selector.
    var _id = sanitize(req.params.id);

    /*
      Utilizaremos a função Contato.remove que recebe como critério o ObjectId procurado. Se a operação for
      realizada com sucesso, enviaremos o status padrão 200 como resposta.
      Um Model criado pelo Mongoose possui a função findByIdAndRemove que remove e passa para o callback o
      contato removido. Em nosso caso, não temos interesse no documento removido; é por isso que a função
      remove foi utilizada.
    */
    Contato.remove({"_id" : _id}).exec()
      .then(
        function(){
          res.end();
        },
        function(erro){
          return console.error(erro);
        }
      );
  };

  controller.salvaContato = function (req, res) {
    /*
      Caso o ID do contato tenha sido definido, utilizaremos a função Contato.findByIdAndUpdate para atualizá-lo.
      Seu primeiro parâmetro é o ID do contato procurado; o segundo, os dados do contato.

      Um Model do Mongoose possui a função update, porém ela apanas atualiza o documento sem retorná-lo após a
      modificação. A função findByIdAndUpdate, além de atualizar, nos dá acesso ao documento atualizado.

      Precisamos implementar o else que adicionará um novo contato. Nesta situação, utilizaremos a função
      Contato.create, que recebe como parâmetro os dados do contato enviados na requisição. Deiferente das funções
      de pesquisa, não precisamos chamar a função exec, pois a própria create já retorna uma promise por padrão.
    */
    var _id = req.body._id;
    /*
      Independente da quantidade de parâmetros, apenas selecionamos o nome, email e emergência.
    */
    var dados = {
      "nome" : req.body.nome,
      "email" : req.body.email,
      "emergencia" : req.body.emergencia || null
    };
    if (_id) {
    Contato.findByIdAndUpdate(_id, dados).exec()
        .then(
          function(contato){
            res.json(contato);
          },
          function(erro){
            console.error(erro);
            res.status(500).json(erro);
          }
        );
    } else {
      Contato.create(dados)
        .then(
          function(contato){
            res.status(201).json(contato);
          },
          function(erro){
            console.log(erro);
            res.status(500).json(erro);
          }
        );
    }
  };

  return controller;
};
