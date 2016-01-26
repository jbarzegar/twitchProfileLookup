module.exports = function(gulp, plugins) {
    var browserSync = require('browser-sync').create();
    return function() {
        plugins.watch('./build/img/*', function() {
            gulp.src('./build/img/*')
                .pipe(plugins.imagemin({
                    progressive: true,
                    interlaced: true,
                    multipass: true,
                    svgoPlugins: [{
                        removeViewBox: true
                    }, {
                        removeUselessStrokeAndFill: true
                    }, {
                        removeEmptyAttrs: true
                    }]
                }))

            .pipe(plugins.notify({
                    message: "Optimized Image: <%= file.relative %> @ <%= options.date %>",
                    templateOptions: {
                        date: new Date()
                    }
                }))
                .pipe(gulp.dest('./img/'));
        });
    };
};
