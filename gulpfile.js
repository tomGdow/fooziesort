var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var ghPages = require('gulp-gh-pages');

var sasspaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src',
  'node_modules/jquery/dist'
];

gulp.task('hello', function() {
  console.log('hello from gulp')
})
gulp.task('browserSync', function (){
  browserSync.init({
    server: {
      baseDir: '.'
    }
  })
});

gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss')
    .pipe($.sass({
      includePaths: sasspaths,
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('useref', function() {
  return gulp.src([
    '*.html'
  ])
    .pipe(useref())
    .pipe(gulp.dest('dist'))
    .pipe($.useref({
      includePaths: sasspaths,
    }))
    .pipe(gulpIf('init.js', uglify()))
    .pipe(gulpIf('app.js', uglify()))
    .pipe(gulpIf('nav.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('move-js',function(){
  return gulp.src([
    'js/fuzzysort.js',
    'js/testdata.js',
    'js/test.js',
    'js/databinding.js'
  ])
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('images', function(){
  return gulp.src('images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function(){
  return gulp.src('fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
})

gulp.task('build', function(callback) {
  runSequence('clean:dist', 
    ['sass', 'useref', 'move-js',  'images', 'fonts'],
    callback
  )
});

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback)
});
