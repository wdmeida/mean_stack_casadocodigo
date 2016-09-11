var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {

  var schema = mongoose.Schema({
    login: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    nome: {
      type: String,
      required: true
    },
    inclusao: {
      type: Date,
      default: Date.now
    }
  });

  //Associa o plugin ao nosso esquema.
  schema.plugin(findOrCreate);
  return mongoose.model('Usuario', schema);
};
