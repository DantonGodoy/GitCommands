const gulp = require('gulp')
  , sass = require('gulp-sass')
  , clean = require('gulp-clean')
  , browserSync = require('browser-sync').create();

// Clean dist directory
gulp.task('clean', function () {
    gulp.src('dist')
        .pipe(clean());
});

// Compile Sass to CSS files
gulp.task('scss-compile', () => {
    gulp.src('project/scss/**/*')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}));
});

// Import the original HTML file to dist directory
gulp.task('html-copy', () => {
    gulp.src('project/index.html')
        .pipe(gulp.dest('dist'));
});

// Import the original .js file to dist directory
gulp.task('js-copy', () => {
    gulp.src('project/js/**/*')
        .pipe(gulp.dest('dist/js'));
});

// Start BrowserSync
gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });

    gulp.watch('dist/scss/**/*', ['scss-compile']);
    gulp.watch('dist/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['clean', 'html-copy', 'js-copy', 'scss-compile', 'serve']);