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
    */
    Contato.find().exec()
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
    var _id = req.params.id;

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
    if (_id) {
    Contato.findByIdAndUpdate(_id, req.body).exec()
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
      Contato.create(req.body)
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
