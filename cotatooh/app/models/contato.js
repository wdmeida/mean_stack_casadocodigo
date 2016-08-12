var mongoose = require('mongoose');

module.exports = function () {

  /*
    Adicionamos no objeto passado como parâmetro para a função mongoose.Schema as chaves que correspondem
    às que queremos em nosso documento, porém cada uma delas possui como valor um objeto de configuração.
    No objeto de configuração, indicamos o Schema Type aceito por cada chave de nosso documento através
    da chave type. Tanto o nome quanto o email devem aceitar apenas texto, por isso atribuímos a type o
    valor String. Existem outros tipos como Number, Date, Boolean e Array, mas por enquanto o tipo String
    já é suficiente.
  */
  var schema = mongoose.Schema({
    nome: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      //Garante que não serão cadastrados contatos com o mesmo e-mail.
      index: {
        unique: true
      }
    }
  });

  /*
    Um Model é um objeto que corresponde a uma collection de nosso banco e utiliza o Schema usado em
    sua criação para validar qualquer documento que tenhamos na collection.
    É por isso que a última linha do nosso módulo retornará um Model criado a partir do nosso Schema.
  */
  return mongoose.model('Contato', schema);
};
