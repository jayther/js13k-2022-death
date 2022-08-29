const gulp          = require('gulp');
const buildTasks    = require('./build.js');
const cssTasks      = require('./css.js');
const templateTasks = require('./template.js');
const zipTasks      = require('./zip.js');
const fullDistTasks = [
  gulp.parallel(
    buildTasks.build,
    buildTasks.buildRelease,
  ),
  cssTasks.css,
  gulp.parallel(
    templateTasks.template,
    templateTasks.templateRelease,
  ),
  zipTasks.zip,
  zipTasks.report
];

exports.dist = gulp.series(...fullDistTasks);