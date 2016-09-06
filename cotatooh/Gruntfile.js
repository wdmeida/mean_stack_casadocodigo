//Recebe o objeto grunt como parâmetro.
module.exports = function(grunt) {
  //Plugins no Grunt são configurados através da função grunt.initConfig({}).
  grunt.initConfig({
    /*
      A função grunt.initConfig recebe como parâmetro um objeto JavaScript. Esse objeto tem como propriedades
      os nomes das tasks que desejamos configurar. Sabemos pela documentação do grunt-contrib-copy que a propriedade
      que representa a task deste plugin é copy.
      Uma tarefa pode ter subtarefas, porém na documentação do Grunt são chamadas de targets (alvos).
    */
    copy: {}
  });

  //Carrega o plugin responsável por realizar cópia dos arquivos do projeto.
  //Repare que o carregamento de plugins do Grunt é feito no gruntfile.js através da função grunt.loadNpmTasks.
  grunt.loadNpmTasks('grunt-contrib-copy');
};
