module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/plugins/*.js', 'js/main.js'],
        dest: 'js/main.concat.js'
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
          'js/main.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'js/main.js'],
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
      all: {
        options: { livereload: true },
        files: ['views/**/*.jade'],
        tasks: ['jade'],
      },
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
          'img/test.jpg': 'img/abstract-q-c-500-500-7.jpg'
        }
      }
    },
    //Jade templating
    jade: {
      compile: {
        options: {
          data: {
            debug: true
          },
          pretty: true
        },
        files: {
          "index.html": ["views/index.jade"]
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: '' //Base path is the current folder
        },
        keepalive: true
      }
    },
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= connect.server.options.port%>'
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

  // Templating
  grunt.loadNpmTasks('grunt-contrib-jade');

  // Other
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-connect');

/* - Register tasks --------------------------------------------------------------- */

  // Javascript
  grunt.registerTask('js', ['jshint', 'concat', 'uglify']);

  // CSS
  grunt.registerTask('css', ['compass']);

  // Images
  grunt.registerTask('img', ['imagemin']);

  // Test tasks
  grunt.registerTask('test', ['jshint']);

  // Start a local web server
  grunt.registerTask('start', [ 'open', 'connect:server:keepalive']);

  // All
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'compass', 'imagemin', 'jade']);


  //TODO : COMPASS WATCH + IMAGE MIN

};