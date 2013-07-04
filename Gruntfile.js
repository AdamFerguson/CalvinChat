module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['public/js/templates.js'],
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
    watch: {
      templates: {
        files: ['templates/*.handlebars'],
        tasks: ['buildTemplates']
      }
    }
  });

  grunt.loadNpmTasks('grunt-ember-handlebars');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('buildTemplates', ['clean','ember_handlebars']);
  grunt.registerTask('default', ['watch']);

};
