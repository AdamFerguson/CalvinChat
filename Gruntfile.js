module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      'client/tmp/compiledChat.js': ['client/chat.js'],
      options: {
        transform: ['coffeeify']
      }
    },
    clean: {
      preBuild: ['public/css/app.css','public/js/app.js'],
      postBuild: ['client/tmp/*']
    },
    concat: {
      options: {
        separator: '\n\n',
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      js: {
        src: [
          'client/vendor/js/moment.js',
          'client/vendor/js/jquery.min.js',
          'client/vendor/js/handlebars.min.js',
          'client/vendor/js/ember.js',
          'client/vendor/js/ember-model.js',
          'client/vendor/js/bootstrap.min.js',
          'client/tmp/compiledTemplates.js',
          'client/tmp/compiledChat.js',
        ],
        dest: 'public/js/app.js'
      },
      css: {
        src: ['client/vendor/css/bootstrap.min.css','client/tmp/compiledStyles.css'],
        dest: 'public/css/app.css'
      }
    },
    ember_handlebars: {
      compile: {
        options: {
          processName: function(filename) {
            pattern = /client\/templates\/(\w+)\.handlebars/;
            return filename.match(pattern)[1];
          }
        },
        files: {
          'client/tmp/compiledTemplates.js': 'client/templates/*.handlebars'
        }
      }
    },
    less: {
      styles: {
        files: {
          'client/tmp/compiledStyles.css': ['client/styles/*.less']
        }
      }
    },
    watch: {
      templates: {
        files: ['client/templates/*.handlebars', 'client/styles/*.less'],
        tasks: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-ember-handlebars');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('build', 
    [
      'clean:preBuild',
      'ember_handlebars',
      'less',
      'browserify',
      'concat',
      'clean:postBuild'
    ]);

  grunt.registerTask('default', ['watch']);

};
