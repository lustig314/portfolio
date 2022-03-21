
const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify  = require('gulp-uglify-es').default;
const autoPrefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');


const initBrowserSync = () => {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
}

const cleanDist = () => {
  return del('dist')
}

const convertImages = () => {
  return src('app/images/**/*')
  .pipe(imagemin(
    [
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
      })
    ]
  ))
  .pipe(dest('dist/images'))
}


const convertScripts = () => {
  return src(
    'app/js/main.js'
  )
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js'))
  .pipe(browserSync.stream())
}

const convertStyles = () => {
  return src('app/scss/style.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoPrefixer({
          overrideBrowserslist: ['last 10 version'],
          grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

const build = () => {
  return src([
    'app/css/style.min.css',
    'app/fonts/**/*',
    'app/js/main.min.js',
    'app/*.html'
  ], {base: 'app'})
  .pipe(dest('dist'))
}


const watchProject = () => {
  watch(['app/scss/**/*.scss'], convertStyles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], convertScripts);
  watch(['app/*.html']).on('change', browserSync.reload);
}


exports.convertStyles = convertStyles;
exports.watchProject = watchProject;
exports.initBrowserSync = initBrowserSync;
exports.convertScripts = convertScripts;
exports.convertImages = convertImages;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, convertImages, build);
exports.default = parallel(convertStyles, convertScripts, initBrowserSync, watchProject)
