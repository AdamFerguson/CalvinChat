module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['public/css/app.css','public/js/templates.js'],
    ember_handlebars: {
      compile: {
        options: {
          processName: function(filename) {
            pattern = /templates\/(\w+)\.handlebars/;
            return filename.match(pattern)[1];
          }
        },
        files: {
          'public/js/templates.js': 'templates/*.handlebars'
        }
      }
    },
    less: {
      styles: {
        files: {
          'public/css/app.css': ['styles/*.less']
        }
      }
    },
    watch: {
      templates: {
        files: ['templates/*.handlebars', 'styles/*.less'],
        tasks: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-ember-handlebars');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['clean','ember_handlebars', 'less']);
  grunt.registerTask('default', ['watch']);

};
