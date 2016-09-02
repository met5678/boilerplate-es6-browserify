module.exports = function (grunt) {
   grunt.initConfig({
      browserify: {
         dist: {
            options: {
               transform: [
                   ["babelify", { presets: "es2015" } ],
                   ["require-globify"]
               ],
               alias: {
                  //"alias": "./path"
               }
            },
            files: {
               "./dist/js/bundle.js": ["./src/js/main.js"]
            }
         }
      },
      watch: {
         options: {
            livereload: true
         },
         gruntfile: {
            files: ["./Gruntfile.js"],
            tasks: ["build"]
         },
         scripts: {
            files: ["./src/js/**"],
            tasks: ["compile"]
         },
         static: {
            files: ["./src/{css,pages}/**"],
            tasks: ["copy"]
         }
      },
      copy: {
         all: {
            files: {
               "./dist/index.html": ["./src/pages/index.html"],
               "./dist/css/main.css"  : ["./src/css/main.css"]
            }
         }
      }
   });

   grunt.loadNpmTasks("grunt-browserify");
   grunt.loadNpmTasks("grunt-contrib-watch");
   grunt.loadNpmTasks("grunt-contrib-copy");

   grunt.registerTask("default", ["build", "watch"]);
   grunt.registerTask("compile", ["browserify"]);
   grunt.registerTask("build", ["compile", "copy"]);
};