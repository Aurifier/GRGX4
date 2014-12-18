//TODO: Lint yuidoc
module.exports = function(grunt) {
 
  grunt.initConfig({
    jshint: {
      all: ['src/*.js']
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
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.registerTask('default', ['jshint','karma']);
};
