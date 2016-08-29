/*
  Define o módulo com a função de callback para o tratamento de rotas. A função verifica se o usuário
  está autenticado. Se ele estiver, o próximo callback processa a requisição, caso contrário,
  enviamos como resposta "Não autorizado" com o status 401 (Unauthorized). Em seguida, passaremos
  a função como primeiro callback para o tratamento das rotas.
*/
module.exports = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status('401').json('Não autorizado');
  }
};
