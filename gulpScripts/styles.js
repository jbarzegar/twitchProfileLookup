module.exports = function(gulp, plugins) {
    var browserSync = require('browser-sync').create();
    return function() {
        plugins.watch('./build/sass/**/*.scss', function() {
            gulp.src('./build/sass/**/*.scss')
                .pipe(plugins.plumber({
                    errorHandler: plugins.notify.onError('Error: <%= error.message %>')
                }))
                .pipe(plugins.sass())
                .pipe(plugins.autoprefixer('last 7 versions'))
                .pipe(plugins.csso())
                .pipe(plugins.notify({
                    message: "Built css file: <%= file.relative %> @ <%= options.date %>",
                    templateOptions: {
                        date: new Date()
                    }
                }))
                .pipe(gulp.dest('./css/'))
                .pipe(browserSync.stream());
        });
    };
};
