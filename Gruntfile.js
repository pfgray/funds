module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      production:{
        options: {
          paths: ["core/client"]
        },
        files: {
          "core/client/app.css": "core/client/app.less"
        }
      }
    },
    html2js: {
        options: {
            base: 'src',
            module: 'templates-main'
        },
        build: {
            src: [
                'core/client/**/**/*-template.html'
            ],
            dest: 'core/client/templates.js',
            options: {
                htmlmin: {
                    removeCommentsFromCDATA: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: false,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                rename:function (moduleName) {
                    return moduleName.substring(moduleName.lastIndexOf("/") + 1);
                }
            }
        }
    },
    watch: {
      files: ['core/client/**/*.less', 'core/client/**/**/*-template.html'],
      tasks: ['less', 'html2js']
    }
  });

  /*
  grunt.event.on('watch', function(action, filepath, target) {
      if(target === 'views'){
          var destFilePath = CP_RESOURCES_TOMCAT_FOLDER + "/" + filepath.replace('src/main/resources/', '');
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action + ' ... and is being copied to: ' + destFilePath);
          shell.exec('cp ' + filepath + ' ' + destFilePath);
      }
  });
  */

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html2js');

};
