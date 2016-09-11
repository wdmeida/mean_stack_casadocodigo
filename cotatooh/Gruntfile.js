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
    copy: {
      project: {
        /*
          Quando true ativa o mapeamento dinâmico. No lugar de definirmos o nome de cada arquivo e seu destino, indicamos
          o diretório de trabalho (cwd), a origem (src) e o destino (desc).
        */
        expand: true,
        /*
          Diretório padrão (current work directory) no qual as demais propriedades se basearão. Em nosso caso, queremos
          a própria pasta que contém nosso script Grunt, por isso utilizados '.'.
        */
        cwd: '.',
        /*
          Array com os arquivos que devem ser copiados. Usamos o grobbing pattern '**' para copiar todos os arquivos
          e diretórios. Desconsideramos alguns arquivos adicionando o prefixo ! em cada um deles.
        */
        src: ['**', '!Gruntfile.js', '!package.json', '!public/bower.json'],
        //Pasta de destino. Em nosso caso, a pasta dist, que é criada caso não exista.
        dest: 'dist'
      }
    },
    //Garante que a pasta dist será apagada antes que a nova cópia seja gerada.
    clean: {
      dist: {
        src: 'dist'
      }
    }
  });

  //Carrega o plugin responsável por realizar cópia dos arquivos do projeto.
  //Repare que o carregamento de plugins do Grunt é feito no gruntfile.js através da função grunt.loadNpmTasks.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
};
