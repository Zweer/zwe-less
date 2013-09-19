/* jshint node: true */

module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
    // metadata
    pkg: grunt.file.readJSON('package.json'),
    banner: '/**\n' +
            ' * ----------------------------------------\n' +
            ' * ZweLess v<%= pkg.version %> by @dotzweer\n' +
            ' * ----------------------------------------\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
            ' */\n\n',

    // task configuration
    clean: {
      dist: ['dist']
    },

    recess: {
      options: {
        compile: true,
        banner: '<%= banner %>'
      },
      zwe: {
        src: ['less/zwe.less'],
        dest: 'dist/<%= pkg.name %>.css'
      },
      min: {
        options: {
          compress: true
        },
        src: ['less/zwe.less'],
        dest: 'dist/<%= pkg.name %>.min.css'
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
  grunt.loadNpmTasks('grunt-recess');

  // CSS distribution task.
  grunt.registerTask('dist-css', ['recess']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css']);

  // Default task.
  grunt.registerTask('default', ['dist']);
};