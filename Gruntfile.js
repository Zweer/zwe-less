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
        dest: 'css/main.min.css'
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

      },
      favicons: {
        src: 'img/favicons/raw.png',
        dest: 'img/favicons'
      }
    },

    watch: {
      recess: {
        files: 'less/*.less',
        tasks: ['recess']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-favicons');
  grunt.loadNpmTasks('grunt-recess');

  // CSS distribution task.
  grunt.registerTask('dist-css', ['copy', 'recess']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css', 'favicons']);

  // Default task.
  grunt.registerTask('default', ['dist']);
};