module.exports = function(grunt) {
  // Load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-stylelint');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-htmlhint');

  // Plugin configuration
  grunt.initConfig({
    jshint: {
      src: ['./**/*.js', '!./node_modules/**/*', '!./bower_components/**/*', '!./Gruntfile.js'],
      options: {
        jshintrc: true
      }
    },
    stylelint: {
      src: ['./**/*.css', '!./node_modules/**/*', '!./bower_components/**/*']
    },
    watch: {
      src: ['./**/*.js', '!./node_modules/**/*', '!./bower_components/**/*'],
      tasks: ['jshint']
    },
    jsonlint: {
      sample: {
        src: ['./**/*.json', '!./node_modules/**/*', '!./bower_components/**/*'],
        options: {
          formatter: 'prose'
        }
      }
    },
    htmlhint: {
      src: ['./**/*.html', '!./node_modules/**/*', '!./bower_components/**/*']
      options: {
        htmlhintrc: '.htmlhintrc'
      }
    }
  });

};
