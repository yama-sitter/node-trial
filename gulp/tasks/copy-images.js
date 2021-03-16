const gulp = require('gulp');
const del = require('del');
const config = require('../config');

gulp.task('clean-images', () => del('./images/**/*', { cwd: config.path.output }));

gulp.task('copy-images', gulp.series('clean-images', (done) => {
  gulp.src('./images/**/*', { cwd: config.path.input })
    .pipe(gulp.dest('./images', { cwd: config.path.output }));
  done();
}));
