module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/*.js', 'js/!(vendor)'],
        dest: 'dist/js/main.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://www.mathieurivest.com/\n' +
        '* Copyright (c) <%= grunt.template.today("dd-mm-yyyy") %>\n' +
        'Mathieu Rivest*/\n'
      },
      dist: {
        files: {
          'dist/js/main.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'js/*.js', 'js/!(vendor)'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
    // Link to config and update the paths
    compass: {
      dist: {
        options: {
          config: 'config.rb',
          cssDir: 'css'
        }
      }
    },
    // Only works with PNG (not JPG)
    imagemin: {
        dist: {
          options: {
            optimizationLevel: 3
          },
          files: {
            'dist/test.jpg': 'img/abstract-q-c-500-500-7.jpg'
          }
        }
      }
  });


/* - Load External tasks ---------------------------------------------------------- */

  // Javascript
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // CSS
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Images
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Other
  grunt.loadNpmTasks('grunt-contrib-watch');


/* - Register tasks --------------------------------------------------------------- */

  // Javascript
  grunt.registerTask('js', ['jshint', 'concat', 'uglify']);

  // CSS
  grunt.registerTask('css', ['compass']);

  // Images
  grunt.registerTask('img', ['imagemin']);

  // Test tasks
  grunt.registerTask('test', ['jshint']);

  // All
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'compass', 'imagemin']);


  //TODO : COMPASS WATCH + SMUSH IT

};