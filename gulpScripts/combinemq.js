module.exports = function(gulp, plugins) {
    return function() {
        plugins.watch('./css/**/*.css', function() {
            return gulp.src('./css/**/*.css')
                .pipe(plugins.combineMq({
                    beautify: false
                }));
        });
    };
};
