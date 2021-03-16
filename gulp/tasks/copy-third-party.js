const gulp = require('gulp');
const del = require('del');
const config = require('../config');

gulp.task('clean-third-party', () => del('./third-party/**/*', { cwd: config.path.output }));

gulp.task('copy-third-party:jquery', (done) => {
  gulp.src('./jquery/dist/**/*', { cwd: config.path.node_modules })
    .pipe(gulp.dest('./third-party/jquery', { cwd: config.path.output }));
  done();
});

gulp.task('copy-third-party:popper.js', (done) => {
  gulp.src('./popper.js/dist/**/*', { cwd: config.path.node_modules })
    .pipe(gulp.dest('./third-party/popper.js', { cwd: config.path.output }));
  done();
});

gulp.task('copy-third-party:bootstrap', (done) => {
  gulp.src('./bootstrap/dist/**/*', { cwd: config.path.node_modules })
    .pipe(gulp.dest('./third-party/bootstrap', { cwd: config.path.output }));
  done();
});

gulp.task('copy-third-party:font-awesome', (done) => {
  gulp.src('./font-awesome/**/*', { cwd: config.path.node_modules })
    .pipe(gulp.dest('./third-party/font-awesome', { cwd: config.path.output }));
  done();
});

gulp.task('copy-third-party', gulp.parallel('copy-third-party:jquery', 'copy-third-party:popper.js', 'copy-third-party:bootstrap', 'copy-third-party:font-awesome'));
