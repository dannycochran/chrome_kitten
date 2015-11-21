module.exports = function (grunt) {

  grunt.initConfig({
    browserify: {
      app: {
        options: {
          transform: [['babelify'], ['sassify', {'auto-inject': true}]]
        },
        files: {
          './dist/background_script.js': ['./app/background_script/background_script.js'],
          './dist/content_script.js': ['./app/content_script/content_script.js'],
          './dist/popup.js': ['./app/popup/popup.js']
        }
      }
    },
    shell: {
      build: {
        command: 'find . -name "*.pem" -type f -delete; find . -name ".DS_Store" -depth -exec rm {} \; find . -name "Icon?" -depth -exec rm {} \; cd dist; zip -r chrome_kitten.zip *;'
      }
    },
    uglify: {
      options: {
        mangle: true,
        compress: true,
      },
      target: {
        files: {
          'dist/background_script.js': ['dist/background_script.js'],
          'dist/content_script.js': ['dist/content_script.js']
        },
      }
    },
    copy: {
      sounds: {
        files: [
          {
            expand: true,
            cwd: './',
            src: ['sounds/**'],
            dest: 'dist/'
          },
        ],
      },
      img: {
        files: [
          {
            expand: true,
            cwd: './',
            src: ['img/**'],
            dest: 'dist/'
          },
        ],
      }
    },
    preprocess: {
      html: {
        src: 'app/popup/popup.html',
        dest: 'dist/popup.html'
      }
    },
    env: {
      dev: {
        NODE_ENV: 'dev'
      },
      prod: {
        NODE_EVN: 'prod'
      }
    },
    concurrent: {
      app: {
        tasks: ['watch'],
        options: {logConcurrentOutput: true}
      }
    },
    watch: {
      js: {
        files: ['app/**/**/*.js', 'app/**/*.js'],
        tasks: ['browserify'],
        options: {livereload: true}
      },
      sass: {
        files: ['app/**/**/*.scss', 'app/**/*.scss'],
        tasks: ['browserify'],
        options: {livereload: true}
      },
      html: {
        files: ['app/*.html'],
        tasks: ['preprocess'],
        options: {livereload: true}
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-env');

  var build = ['browserify', 'copy', 'preprocess'];
  grunt.registerTask('app', ['env:dev'].concat(build).concat(['concurrent:app']));
  grunt.registerTask('build', ['env:prod'].concat(build).concat(['uglify', 'shell']));
};
