const gulp = require('gulp');
const del = require('del');
const config = require('../config');

gulp.task('clean-javascripts', () => del('./javascripts/**/*', { cwd: config.path.output }));

gulp.task('copy-javascripts', gulp.series('clean-javascripts', (done) => {
  gulp.src('./javascripts/**/*', { cwd: config.path.input })
    .pipe(gulp.dest('./javascripts', { cwd: config.path.output }));
  done();
}));
