var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    watch = require('gulp-watch'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename');
var date = new Date().getTime();
// compress JS file to build
gulp.task('compress', function() {
    return gulp.src(['src/**/*.js', '!src/lib/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('build'))
        .pipe(uglify().on('error', function(e) { console.log('\x07', e.message);
            return this.end(); }))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('build'));
});
// copy all of html、img、css etc to build
gulp.task('copyOther', function() {
    return gulp.src(['src/**/*', '!src/**/*.js'])
        .pipe(gulp.dest('build'));
});
// copy lib folder
gulp.task('copyLib', function() {
    return gulp.src('src/lib/**/*.js')
        .pipe(gulp.dest('build/lib'));
});
//  clean build
gulp.task('clean', function() {
    return gulp.src('build')
                .pipe(clean());
});
// merge & compress CSS file
gulp.task('css', function(){
    return gulp.src(['src/**/*.css', '!src/lib/**/*.css'])
                .pipe(concat('all.min.css'))
                .pipe(minifycss())
                .pipe(gulp.dest('build'));
});

gulp.task('default', ['clean'], function(){
    gulp.start('copyLib', 'copyOther', 'compress', 'css');
});

gulp.task('watch', function(){
    gulp.watch('src/**/*', ['default']);
    })