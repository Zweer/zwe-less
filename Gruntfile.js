/* jshint node: true */

module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
    // metadata
    pkg: grunt.file.readJSON('../master/package.json'),
    banner: '/**\n' +
            ' * ----------------------------------------\n' +
            ' * ZweLess v<%= pkg.version %> by @dotzweer\n' +
            ' * ----------------------------------------\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %>\n' +
            ' */\n\n',

    // task configuration
    clean: {
      dist: ['css']
    },

    recess: {
      options: {
        compile: true,
        banner: '<%= banner %>'
      },
      min: {
        options: {
          compress: true
        },
        src: ['less/main.less'],
        dest: 'css/main.css'
      }
    },

    copy: {
      less: {
        expand: true,
        src: ['**'],
        cwd: '../master/less',
        dest: './less/zwe-less'
      }
    },

    favicons: {
      options: {
        appleTouchBackgroundColor: 'none',
        tileColor: 'none'
      },
      favicons: {
        src: 'img/favicons/raw.png',
        dest: 'img/favicons'
      }
    },

    jekyll: {
      docs: {
        dest: '../site'
      }
    },

    validation: {
      options: {
        reset: true
      },
      files: {
        src: ["../site/**.html"]
      }
    },

    watch: {
      options: {
        interval: 5007
      },
      recess: {
        files: 'less/**.less',
        tasks: ['recess']
      },
      test: {
        files: ['less/**.less', '*.html', '*/**.html', '_config.yml'],
        tasks: ['test']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks('grunt-favicons');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-jekyll');

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['jekyll', 'validation']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['copy', 'recess']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css'/*, 'favicons'*/]);

  // Default task.
  grunt.registerTask('default', ['dist']);

  // Test task
  grunt.registerTask('test', ['dist', 'validate-html']);
};