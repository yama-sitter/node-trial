const gulp = require('gulp');
const del = require('del');
const uglify = require('gulp-uglify');
const config = require('../config');

gulp.task('clean-minified-javascripts', () => del('./javascripts/**/*', { cwd: config.path.output }));

gulp.task('minify-javascripts', gulp.series('clean-minified-javascripts', (done) => {
  gulp.src('./javascripts/**/*.js', { cwd: config.path.input })
    .pipe(uglify(config.uglify))
    .pipe(gulp.dest('./javascripts', { cwd: config.path.output }));
  done();
}));
