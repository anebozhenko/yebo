'use strict';

const gulp = require('gulp'),
			sass = require('gulp-sass'),
			postcss = require('gulp-postcss'),
			cssnano = require('cssnano'),
			autoprefixer = require('autoprefixer'),
			babel = require('gulp-babel'),
			imagemin = require('gulp-imagemin'),
			livereload = require('gulp-livereload');

// Tasks for development
gulp.task('html:dev', function() {
  gulp.src('src/*.html')
    .pipe(livereload());
});

gulp.task('css:dev', function() {
  gulp.src('src/sass/main.sass')
    .pipe(sass())  
    .pipe(gulp.dest('src/css'))
    .pipe(livereload());
});

gulp.task('js:dev', function() {
  gulp.src('src/js/main.js')
    .pipe(livereload());
});

gulp.task('watch:dev', function() {
  livereload.listen();
  gulp.watch('src/*.html', ['html:dev']);
  gulp.watch('src/sass/**/*.sass', ['css:dev']);
  gulp.watch('src/js/**/*.js', ['js:dev']);
});

gulp.task('compile:dev', ['html:dev', 'css:dev', 'js:dev']);

gulp.task('dev', ['compile:dev', 'watch:dev']);

// Tasks for production
gulp.task('imagemin', function() {
  gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'))
});

gulp.task('fonts', function() {
  gulp.src('src/fonts/*')
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('html:build', function() {
  gulp.src('src/*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('css:build', function() {
  gulp.src('src/css/*.css')
    .pipe(postcss([cssnano(), autoprefixer({browsers: ['last 2 versions']})]))
    .pipe(gulp.dest('build/css'));
});

gulp.task('js:build', function() {
  gulp.src('src/js/main.js')
  	.pipe(babel({
  		presets: ['@babel/env']
  	}))
    .pipe(gulp.dest('build/js'));
});

gulp.task('build', ['compile:dev', 'imagemin', 'fonts', 'html:build', 'css:build', 'js:build']);

// Other tasks
gulp.task('default', function() {
  gulp.start('dev');
});