const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('babel', () => (
  gulp.src('src/index.js')
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest('lib'))
));

gulp.watch('src/**', ['babel']);

gulp.task('default', ['babel']);
