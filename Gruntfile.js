module.exports = function(grunt) {
  var globalConfig = {
      src: 'src/'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    globalConfig: globalConfig,
    jshint: {
      all: ['<%= globalConfig.src %>*.js']
    },
    browserify: {
        main: {
            src: '<%= globalConfig.src %>*.js',
            dest: 'js/grgx.js'
        }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
      /*continuous: { //PhantomJS doesn't support Promises yet
        configFile: 'karma.conf.js',
        singleRun: true
        browsers: ['PhantomJS']
      }*/
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: '<%= globalConfig.src %>',
          //themedir: 'path/to/custom/theme/',
          outdir: 'docs/'
        }
      }
    }
  });
 
  grunt.registerTask('yuidoc-lint', 'Lint YUIDocs', function() {
      var done = this.async();
      testlint = grunt.util.spawn({
          cmd: './node_modules/.bin/yuidoc',
          args: ['--lint', globalConfig.src]
      }, function(error, result, code) {
          if(code == 1) {
              return grunt.log.error('YUIDoc lint failed');
          }
          done(error);
      });
      testlint.stdout.pipe(process.stdout);
      testlint.stderr.pipe(process.stderr);
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('lint', ['jshint', 'yuidoc-lint']);
  grunt.registerTask('all', ['lint', 'karma', 'yuidoc', 'browserify']);
  grunt.registerTask('default', ['all']);
};
