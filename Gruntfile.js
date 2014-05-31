module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      production:{
        options: {
          paths: ["public/style"]
        },
        files: {
          "public/style/app.css": "public/style/source/app.less"
        }
      }
    },
    watch: {
      files: ['public/style/*.less'],
      tasks: ['less']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');

};