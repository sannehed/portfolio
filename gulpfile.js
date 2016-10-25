var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('build:clean', function() {
    return del(['Build/*']);
});

gulp.task('build:styles', function () {
    return gulp.src('Src/Styles/**/*.css')
        .pipe(gulp.dest('Build/Styles'));
});

gulp.task('build:images', function() {
    return gulp.src('Src/Media/Images/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('Build/Media/Images'));
});

gulp.task('build:fonts', function () {
    return gulp.src('Src/Media/Fonts/*')
        .pipe(gulp.dest('Build/Media/Fonts'));
});

gulp.task('build:html', function() {
    return gulp.src('Src/**/*.html')
        .pipe(gulp.dest('Build/'));
});

gulp.task('build:scripts', function() {
    return gulp.src('Src/Scripts/**/*.js')
        .pipe(gulp.dest('Build/Scripts'));
});

gulp.task('source:watch', function() {
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['Build/**']).on('change', livereload.changed);

    // Watch .scss files
    gulp.watch('Src/Styles/**/*.css', ['build:styles']);

    // Watch .js files
    gulp.watch('Src/Scripts/**/*.js', ['build:scripts']);

    // Watch image files
    gulp.watch('Src/Media/**/*', ['build:images']);

    // Watch HTML files
    gulp.watch('Src/**/*.html', ['build:html']);
});

gulp.task('build:all', ['build:clean'], function() {
    gulp.start('build:styles', 'build:scripts', 'build:images', 'build:html', 'build:fonts');
});

gulp.task('server:start', function() {
    connect.server({
        root: 'Build',
        livereload: true
    });
});

gulp.task('server-watch', function () {
    gulp.start('server:start');
    gulp.start('source:watch');
});

gulp.task('default', function () {
    console.log('No task connected to default.');
});