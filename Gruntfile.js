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
    },
    jasmine_node: {
        options: {
            forceExit: false,
            matchall: true
        },
        all: ['test/functional/']
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
    },
    'start-selenium-server': {
        dev: {
            options: {
                downloadUrl: 'http://selenium-release.storage.googleapis.com/2.44/selenium-server-standalone-2.44.0.jar'
            }
        }
    },
    'stop-selenium-server': {
        dev: {

        }
    },
    connect: {
        server: {
            options: {
                port: 9001
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

  var seleniumChildProcesses = {};
  grunt.event.on('selenium.start', function(target, process){
      grunt.log.ok('Saw process for target: ' +  target);
      seleniumChildProcesses[target] = process;
  });

  grunt.util.hooker.hook(grunt.fail, function(){
      // Clean up selenium if we left it running after a failure.
      grunt.log.writeln('Attempting to clean up running selenium server.');
      for(var target in seleniumChildProcesses) {
          grunt.log.ok('Killing selenium target: ' + target);
          try {
              seleniumChildProcesses[target].kill('SIGTERM');
          }
          catch(e) {
              grunt.log.warn('Unable to stop selenium target: ' + target);
          }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-selenium-server');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('functional', ['browserify', 'connect', 'start-selenium-server:dev', 'jasmine_node']);
  grunt.registerTask('lint', ['jshint', 'yuidoc-lint']);
  grunt.registerTask('all', ['lint', 'karma:unit', 'functional', 'yuidoc', 'browserify']);
  grunt.registerTask('default', ['all']);
};
