var gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  clean = require('gulp-clean'),
  uglify = require('gulp-uglify'),
  cssmin = require('gulp-cssmin'),
  usemin = require('gulp-usemin'),
  browserSync = require('browser-sync'),
  jshint = require('gulp-jshint'),
  jshintStylish = require('jshint-stylish'),
  csslint = require('gulp-csslint'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass');

gulp.task('default', ['copy'], function () {
  gulp.start('build-img', 'usemin');
});

gulp.task('copy', ['clean'], function () {
  return gulp.src('app/src/img/*')
    .pipe(gulp.dest('dist/src/img'));
});

gulp.task('clean', function () {
  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('build-img', function () {
  gulp.src('dist/src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/src/img'));
});

gulp.task('usemin', function () {
  gulp.src('app/index.html')
    .pipe(usemin({
      'js': [uglify().on('error', function(e){
        console.log(e);
      })],
      'css': [autoprefixer, cssmin]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('index', function () {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });

  gulp.watch('app/src/js/**/*.js').on('change', function (event) {
    gulp.src(event.path)
      .pipe(jshint())
      .pipe(jshint.reporter(jshintStylish));
  });

  gulp.watch('app/src/css/**/*.css').on('change', function (event) {
    gulp.src(event.path)
      .pipe(csslint())
      .pipe(csslint.formatter());
  });

  gulp.watch('app/src/sass/*.scss').on('change', function (event) {
    console.log('Arquivo alterado: ' + event.path);
    console.log('Compilando app/src/sass/monit.scss');

    gulp.src('app/src/sass/monit.scss')
      .pipe(sass().on('error', function (error) {
        console.log('Problema ao compilar: ');
        console.log(error.message);
      }))
      .pipe(gulp.dest('app/src/css'));
  });

  gulp.watch('app/**/**/**/*').on('change', browserSync.reload);
});