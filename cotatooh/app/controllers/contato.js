module.exports = function(app) {
  //Obtêm uma referência ao Model disponível na instância do Express passada como parâmetro para o módulo.
  var Contato = app.models.contato;

  var controller = {};

  controller.listaTodos = function(req, res) {
    var promise = Contato.find().exec();
  };

  controller.obtemContato = function(req, res) {};

  controller.removeContato = function(req, res) {};

  controller.salvaContato = function (req, res) {};

  return controller;
};
