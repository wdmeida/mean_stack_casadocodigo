/*
Exemplo verboso utilizando o driver nativo do mongo.
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

// ObjectID de um contato existente.
var _idProcurado = new ObjectID('57a9214f54944dfb83c3f64c');

//Repare a quantidade de funções aninhadas. Essa "confusão" pode resultar no callback HELL, dependendo da
//complexidade da consulta.
MongoClient.connect('mongodb://127.0.0.1:27017/contatooh',
          function(erro, db) {
            if (erro) throw err;
            db.collection('contatos').findOne({_id : _idProcurado},
                function(erro, contato) {
                  if (erro) throw err;
                  console.log(contato);
                }
              );
          }
        );
*/
