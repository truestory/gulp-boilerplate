'use strict';

/*
**  Autor: True Story
**  Copyright: True Story
**  More info: hello@truestory.io
*/


// Load plugins
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-ruby-sass');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var cache = require('gulp-cache');
var size = require('gulp-size');
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var es = require('event-stream');

// Styles
gulp.task('styles', function () {
    return gulp.src('app/_/styles/main.scss')
        .pipe(sass({
          style: 'expanded',
          loadPath: ['app/_/libs']
        }))
        .pipe(autoprefixer('last 10 version', '> 1%', 'ie 8', 'ie 7', 'Android 4', 'Blackberry 7', 'Opera 12.1', 'iOS 5'))
        //.pipe(csso())   // minify css
        .pipe(livereload(server))
        .pipe(size())
        .pipe(gulp.dest('dist/_/styles'));
});

// Scripts
gulp.task('scripts', function () {

    return es.concat(
        gulp.src(['app/_/scripts/**/*.js', '!app/_scripts/preinitialise.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(browserify({ insertGlobals : true }))
        .pipe(concat('main.js'))
        //.pipe(uglify())
        .pipe(livereload(server))
        .pipe(gulp.dest('dist/_/scripts')),
        
        gulp.src('app/_/libs/**/*').pipe(gulp.dest('dist/_/libs')),
        
        gulp.src('app/_/scripts/preinitialise.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/_/scripts'))
    );
});

// HTML
gulp.task('html', function () {
     return gulp.src(['app/**/*.html', '!app/{_,_/**}'])
        .pipe(livereload(server))
        .pipe(size())
        .pipe(gulp.dest('dist'));
});

// OTHER
gulp.task('other', function () {
     return gulp.src('app/_/other/**/*')
        .pipe(livereload(server))
        .pipe(size())
        .pipe(gulp.dest('dist/_/other/'));
});

// Images
gulp.task('images', function () {
    return gulp.src('app/_/images/**/*')
        /*.pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))*/
        .pipe(livereload(server))
        .pipe(size())
        .pipe(gulp.dest('dist/_/images'));
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist/_/styles', 'dist/_/scripts', 'dist/_/images', 'dist/_/other'], {read: false}).pipe(clean());
});

// Build
gulp.task('build', ['html', 'styles', 'scripts', 'images', 'other']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Watch
gulp.task('watch', function () {
    // Listen on port 35729
    server.listen(35729, function (err) {
        if (err) {
            return console.error(err);
        };

        // Watch .html files
        gulp.watch('app/**/*.html', ['html']);

        // Watch .scss files
        gulp.watch('app/_/styles/**/*.scss', ['styles']);

        // Watch .js files
        gulp.watch('app/_/scripts/**/*.js', ['scripts']);

        // Watch image files
        gulp.watch('app/_/images/**/*', ['images']);

        // Watch other files
        gulp.watch('app/_/other/**/*', ['other']);

    });
});
