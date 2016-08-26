module.exports = function(grunt) {

  // Plugin configuration
  grunt.initConfig({
    browserify: {
      js: {src: ['./src/js/scripts.js'],
        dest: './dist/app.js'},
      options: {
        transform: ['hbsfy']}
    },
    jshint: {
      all: {
        src: ['./**/*.js', '!./dist/app.js', '!./node_modules/**/*', '!./bower_components/**/*', '!./Gruntfile.js'],
        options: {
          jshintrc: true
        }
      }
    },
    stylelint: {
      all: {
        src: ['./**/*.css', '!./node_modules/**/*', '!./bower_components/**/*']
      }
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['./**/*.js', '!./dist/app.js','!./node_modules/**/*', '!./bower_components/**/*'],
        tasks: ['browserify','jshint']
      },
      css: {
        files: ['./**/*.css', '!./node_modules/**/*', '!./bower_components/**/*'],
        tasks: ['stylelint']
      },
      json: {
        files: ['./**/*.json', '!./node_modules/**/*', '!./bower_components/**/*'],
        tasks: ['jsonlint']
      },
      sass: {
        files: ['./**/*.scss', '!./node_modules/**/*', '!./bower_components/**/*'],
        tasks: ['sass']
      }
    },
    jsonlint: {
      all: {
        src: ['./**/*.json', '!./node_modules/**/*', '!./bower_components/**/*'],
        options: {
          format: true,
          indent: 2
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'dist/main.css': 'src/sass/main.scss'       // 'destination': 'source'
        }
      }
    },
    hbs: {
      files: ['./templates/**/*.hbs'],
      tasks: ['browserify']
    }
  });
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['browserify','sass','watch']);
};
