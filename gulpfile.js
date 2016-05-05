const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');

const path = {
  src: 'src/*.*',
  js: 'src/index.js',
  test: 'src/*.spec.js',
};

gulp.task('js', () => (
  gulp.src(path.js)
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest('lib'))
));

gulp.task('test', ['js'], () => (
  gulp.src(path.test)
    .pipe(mocha())
));

gulp.watch(path.src, ['default']);

gulp.task('default', ['js', 'test']);
