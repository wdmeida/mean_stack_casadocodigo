module.exports = function (app) {
  var controller = app.controllers.contato;

/*  app.get('/contatos', controller.listaContatos);

  app.get('/contatos/:id', controller.obtemContato);
  app.delete('/contatos/:id', controller.removeContato);
*/
  /*
    A partir do Express 4, podemos encadear os identificadores, ao invés de inserir os mesmos duplicados.
    Repare que agora não temos mais identificadores duplicados, mas sabemos que cada um deles responderá
    a mais de um verbo HTTP. É por isso que podemos encadear a chamada às funções get, post, delete e put.
    Para um mesmo identificador, podemos associar diferentes verbos HTTPs, tornando a declaração de nossas
    rotas mais enxutas e mais fácil de manter.
  */
  app.route('/contatos')
    .get(controller.listaTodos);
    //.post(controller.salvaContato);

  app.route('/contatos/:id')
    .get(controller.obtemContato)
    .delete(controller.removeContato);
};
