'use strict';

const gulp      = require('gulp');
const gulp_zip       = require('gulp-zip');
const rename    = require('gulp-rename');
const log       = require('fancy-log');
const colors    = require('ansi-colors');
const htmlmin   = require('gulp-htmlmin');
const fs        = require('fs');
const buildTasks = require('./build.js');
const templateTasks = require('./template.js');

function beep() {
  import('beeper').then(module => module.default());
}

function zip() {
  return gulp.src('./dist/index.min.html')
    .pipe( htmlmin({ collapseWhitespace: true }) )
    .pipe( rename('index.html') )
    .pipe( gulp_zip('game.zip') )
    .pipe( gulp.dest('dist') );
}

function report(done) {
  fs.stat( './dist/game.zip', ( err, data ) => {
    if ( err ) {
      beep();
      return done( err );
    }
    log(
      colors.yellow.bold(`Current game size: ${ data.size } bytes`)
    );
    let percent = parseInt( ( data.size / 13312 ) * 100, 10 );
    log(
      colors.yellow.bold(`${ percent }% of total game size used`)
    );
    done();
  });
}

exports.zip = zip;
exports.report = report;
