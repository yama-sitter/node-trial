const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const config = require('../config');

gulp.task('clean-sass', () => del('./stylesheets/**/*', { cwd: config.path.output }));

gulp.task('compile-sass', gulp.series('clean-sass', (done) => {
  gulp.src('./stylesheets/**/*.scss', { cwd: config.path.input })
    .pipe(sass(config.sass))
    .pipe(gulp.dest('./stylesheets', { cwd: config.path.output }));
  done();
}));
