var contatos = [
  {_id: 1, nome: 'Contato Exemplo 1',
    email: 'cont1@empresa.com.br'},
  {_id: 2, nome: 'Contato Exemplo 2',
    email: 'cont2@empresa.com.br'},
  {_id: 3, nome: 'Contato Exemplo 3',
    email: 'cont3@empresa.com.br'}
];

module.exports = function() {
  var controller = {};

  controller.listaTodos = function(req, res) {
    //envia a lista no formato json.
    res.json(contatos);
  };

  controller.obtemContato = function(req, res) {
    var idContato = req.params.id; //Obtém o id do contato requisitado.
    var contato = contatos.filter(function(contato) {
      return contato._id == idContato;
    })[0];
    //Verifica se contato foi encontrado, caso seja, retorna um json com o conteúdo.
    contato ? res.json(contato) : res.status(404).send('Contato não encontrado');
  };

  controller.removeContato = function(req, res) {
    //Obtém o id recebido na requisição.
    var idContato = req.params.id;
    contatos = contatos.filter(function(contato) {
      return contato._id != idContato;
    });
    res.status(204).end();
  };

  return controller;
};
