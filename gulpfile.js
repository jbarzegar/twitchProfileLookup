var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
gulp.task('jade', require('./gulpScripts/jade.js')(gulp, plugins));
gulp.task('styles', require('./gulpScripts/styles.js')(gulp, plugins));
gulp.task('combinemq', require('./gulpScripts/combinemq.js')(gulp, plugins));
gulp.task('imagemin', require('./gulpScripts/imagemin.js')(gulp, plugins));
gulp.task('scripts', require('./gulpScripts/scripts.js')(gulp, plugins));
gulp.task('server', function() {
    browserSync.init({
        server: "./",
        browser: "google chrome"
    });
    watch('./*.html').on('change', browserSync.reload);
    watch('./css/*.css').on('change', browserSync.reload);
});

// Uncss task
gulp.task('clean', function() {
    return gulp.src('css/main.css')
    	.pipe(plugins.plumber({
    	    errorHandler: plugins.notify.onError('Error: <%= error.message %>')
    	}))
        .pipe(plugins.uncss({
            html: ['*.html'],
            js: ['*.js']
        }))
        .pipe(plugins.csso())
        .pipe(plugins.notify({
            message: "Cleaned css file: <%= file.relative %> @ <%= options.date %>",
            templateOptions: {
                date: new Date()
            }
        }))
        .pipe(gulp.dest('css/'));
});
gulp.task('default', ['jade', 'styles', 'server', 'imagemin', 'scripts', 'combinemq'], browserSync.relaod);