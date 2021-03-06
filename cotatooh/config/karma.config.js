// Karma configuration
/*
  Apesar de o Karma nos fornecer um ambiente para executarmos nossos testes de unidade, precisamos configurar
  seu arquivo karma.config.js. Nele informamos a localização de nossos scripts e bibliotecas, o framework de
  teste escolhido, os navegadores utilizados para teste entre outras configurações.
  No lugar de criarmos o arquivo manualmente, podemos pedir ao seu assistente que crie um para nós. Valos criar o
  arquivo dentro da pasta contatooh/config, porém rodaresmos o comando dentro da pasta rais contatooh:

    karma init config/karma.config.js
*/
// Generated on Tue Sep 13 2016 22:09:12 GMT-0300 (BRT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../public/vendor/angular/angular.js',
      '../public/vendor/angular-mocks/angular-mocks.js',
      '../public/vendor/angular-resource/angular-resource.js',
      '../public/vendor/angular-route/angular-route.js',
      '../public/js/main.js',
      '../public/js/controllers/**/*.js',
      '../public/js/services/**/*.js',
      '../test/spec/**/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
