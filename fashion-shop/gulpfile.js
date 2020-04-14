const gulp = require('gulp');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourceMaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');
const del = require('del');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const argv = require('yargs').argv;

const config = {
  src: 'src',
  output: 'dist',
};

gulp.task('sass', () =>
  gulp.src(`${config.src}/scss/style.scss`)
    .pipe(plumber())
    .pipe(gulpIf(!argv.prod, sourceMaps.init()))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulpIf(argv.prod, autoprefixer({ overrideBrowserslist: ['last 2 version'] })))
    .pipe(gulpIf(argv.prod, cleanCss()))
    .pipe(gulpIf(!argv.prod, sourceMaps.write()))
    .pipe(gulp.dest(`${config.output}/css`))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task('html', () =>
  gulp.src(`${config.src}/*.html`)
    .pipe(gulp.dest(`${config.output}`))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task('js', () =>
  gulp.src(`${config.src}/js/**/*.js`)
    .pipe(plumber())
    .pipe(gulpIf(argv.prod,
      babel({
        presets: [
          ['@babel/env', { modules: false }]
        ]
      }))
    )
    .pipe(gulpIf(argv.prod, uglify()))
    .pipe(gulp.dest(`${config.output}/js`))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task('css', () =>
  gulp.src(`${config.src}/css/**/*.css`)
    .pipe(gulp.dest(`${config.output}/css`))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task('all-img', () =>
  gulp.src(`${config.src}/img/**/*.{png,jpg}`)
    .pipe(gulp.dest(`${config.output}/img`))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task('images', () =>
  gulp.src(`${config.output}/img/**/*.{png,jpg}`)
    .pipe(gulpIf(argv.prod,
      imagemin([
        imagemin.mozjpeg({ progressive: true }),
        imageminJpegRecompress({
          loops: 5,
          min: 65,
          max: 70,
          quality: 'medium'
        }),
        imagemin.optipng({ optimizationLevel: 3 }),
        pngquant({ quality: [0.7, 0.8], speed: 5 })
      ])
    ))
    .pipe(gulp.dest(`${config.output}/img`))
);

gulp.task('svg', () =>
  gulp.src(`${config.src}/img/**/*.svg`)
    .pipe(svgmin({
      js2svg: { pretty: true }
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: 'sprite.svg'
        }
      }
    }))
    .pipe(gulp.dest(`${config.output}/img`))
);

gulp.task('serve', () => {
  browserSync.init({ server: config.output });

  gulp.watch(`${config.src}/scss/**/*.scss`, gulp.series(`sass`));
  gulp.watch(`${config.src}/*.html`, gulp.series(`html`));
  gulp.watch(`${config.src}/js/**/*.js`, gulp.series(`js`));
  gulp.watch(`${config.src}/css/**/*.css`, gulp.series(`css`));
  gulp.watch(`${config.src}/img/**/*.{png,jpg}`, gulp.series(`all-img`));
  gulp.watch(`${config.src}/img/**/*.{svg}`, gulp.series(`svg`));
});

gulp.task('copy', () =>
  gulp.src([
    `${config.src}/img/**`,
    `${config.src}/js/**`,
    `${config.src}/css/**`,
    `${config.src}/*.html`
  ], { base: config.src }).pipe(gulp.dest(config.output))
);

gulp.task('clean', () => del(config.output));

gulp.task('default', gulp.series('clean', 'copy', 'sass', 'serve'));
gulp.task('build', gulp.series('clean', 'copy', 'sass', 'js', 'images', 'svg'));
