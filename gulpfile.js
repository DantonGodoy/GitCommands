const gulp = require('gulp')
  , sass = require('gulp-sass')
  , browserSync = require('browser-sync').create();

// Complies Sass files to Css files
gulp.task('scss-compile', function(){
    gulp.src('project/scss/**/*')
        .pipe(sass())
        .pipe(gulp.dest('project/css'))
        .pipe(browserSync.reload({stream: true}));
});

// Start BrowserSync
gulp.task('serve', function(){
    browserSync.init({
        server: {
            baseDir: 'project/'
        }
    });

    gulp.watch('project/scss/**/*', ['scss-compile']);
    gulp.watch('project/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['scss-compile', 'serve']);