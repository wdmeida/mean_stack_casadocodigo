module.exports = function(app){

  app.get('/', function(req, res) {
    var login = '';
    //Verifica se existem dados do usuário.
    if (req.user) {
      login = req.user.login;
    }
    res.render('index', { "usuarioLogado" : login});
  });
};
