module.exports = function() {
  var controller = {};
  /*
    Adiciona ao objeto controller a propriedade index, que armazena uma função com dois
    parâmetros: o primeiro, o objeto que representa o fluxo da requisição; o segundo, o
    de resposta. É através do objeto res que enviaremos a página index.ejs.
  */
  controller.index = function(req, res) {
    /*
      Não podemos devolver diretamente a página index.ejs, porque ela não está completa
      e precisa do dado nome. É por isso que usamos a função res.render. Ela recebe dois 
      parâmetros: o primeiro é o nome da view que será retornada e o segundo, um objeto
      JavaScript com dados que será consumido por esta view.
    */
    res.render('index', {nome: 'Express'});
  };

  return controller;
}
