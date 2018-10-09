const gulp        = require('gulp')
    , sass        = require('gulp-sass')
    , clean       = require('gulp-clean')
    , browserSync = require('browser-sync').create();

    // Configuration
let configuration = {
    paths: {
        src: {
            html: './project/index.html',
            scss: './project/scss/**/*',
            js: './project/js/**/*',
            images: './project/images/**/*'
        },
        dist: './dist'
    }
};

// Clean dist directory
gulp.task('clean', () => {
    return gulp.src(configuration.paths.dist + '/')
        .pipe(clean());
});

// Compile Sass to CSS files
gulp.task('scss-compile', () => {
    return gulp.src('project/scss/**/*')
        .pipe(sass())
        .pipe(gulp.dest(configuration.paths.dist + '/css'))
        .pipe(browserSync.reload({stream: true}));
});

// Import the original HTML file to dist directory
gulp.task('html-copy', () => {
    return gulp.src(configuration.paths.src.html)
        .pipe(gulp.dest(configuration.paths.dist + '/'));
});

// Import the original .js file to dist directory
gulp.task('js-copy', () => {
    return gulp.src(configuration.paths.src.js)
        .pipe(gulp.dest(configuration.paths.dist + '/js'));
});

// Import the original images directory to dist directory
gulp.task('img-copy', () => {
    return gulp.src(configuration.paths.src.images)
        .pipe(gulp.dest(configuration.paths.dist + '/images'));
});

// Start BrowserSync
gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });

    gulp.watch(configuration.paths.src.html, ['html-copy']).on('change', browserSync.reload);
    gulp.watch(configuration.paths.src.scss, ['scss-compile']).on('change', browserSync.reload);
    gulp.watch(configuration.paths.src.js, ['js-copy']).on('change', browserSync.reload);
});

gulp.task('default', ['clean', 'html-copy', 'js-copy', 'img-copy', 'scss-compile', 'serve']);