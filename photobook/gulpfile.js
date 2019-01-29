const autoprefixer = require('gulp-autoprefixer');
const browerSync = require('browser-sync').create();
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');

const config = {
    paths: {
        less: './src/less/**/*.less',
        html: './public/index.html'
    },
    output: {
        cssName: 'bundle.min.css',
        path: './public'
    },
    production: true
};

gulp.task('less', () => {
    return gulp.src(config.paths.less)
        .pipe(gulpIf(!config.production, sourcemaps.init()))
        .pipe(less())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        .pipe(gulpIf(config.production, cleanCss()))
        .pipe(gulpIf(!config.production, sourcemaps.write()))
        .pipe(gulp.dest(config.output.path))
        .pipe(browerSync.stream());
});

gulp.task('serve', () => {
    browerSync.init({
        server: {
            baseDir: config.output.path
        }
    });

    gulp.watch(config.paths.less, gulp.series('less'));
    gulp.watch(config.paths.html).on('change', browerSync.reload);
});

gulp.task('default', gulp.series('less', 'serve'));
