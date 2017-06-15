var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

    gulp.task('jquery',function(){
        return gulp.src('./node_modules/jquery-custom/jquery.2/src')
        .pipe(plugins.jquery({
            flags: ['-deprecated', '-event/alias', '-ajax/script', '-ajax/jsonp', '-exports/global']
        }))
        .pipe(gulp.dest('./public/vendor/'));
    });

    gulp.task('default',['jquery'],function(){
        console.log('build completed!');
    })