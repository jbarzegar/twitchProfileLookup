module.exports = function(gulp, plugins) {
    return function() {
        plugins.watch('./build/html/**/*.jade', function() {
            gulp.src('./build/html/*.jade')
                .pipe(plugins.plumber())
                .pipe(plugins.jade({
                    pretty: true
                }))
                .pipe(plugins.notify({
                    message: "Built jade file: <%= file.relative %> @ <%= options.date %>",
                    templateOptions: {
                        date: new Date()
                    }
                }))
                .pipe(gulp.dest('./'));
        })
    };
};
