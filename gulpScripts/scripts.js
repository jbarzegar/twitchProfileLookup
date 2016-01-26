module.exports = function(gulp, plugins) {
    return function() {
        plugins.watch('./build/js/**/*.js', function() {
            gulp.src('./build/js/**/*.js')
                .pipe(plugins.plumber())
                .pipe(plugins.uglify())
                .pipe(plugins.notify({
                    message: "Built js file: <%= file.relative %> @ <%= options.date %>",
                    templateOptions: {
                        date: new Date()
                    }
                }))
                .pipe(gulp.dest('./js/'));
        });
    };
};
