const gulp = require('gulp');
const load = require('require-dir');
const config = require('./gulp/config');

load('./gulp/tasks', { recurse: true });

const baseTasks = ['copy-third-party', 'copy-images', 'copy-javascripts', 'compile-sass'];
const tasks = config.env.IS_DEVELOPMENT ? baseTasks : baseTasks.concat('minify-javascripts');

gulp.task('default', gulp.parallel(...tasks));
