'use strict';

const gulp        = require('gulp');
const rollup      = require('rollup-stream');
const srcmaps     = require('gulp-sourcemaps');
const terser      = require('gulp-terser');
const buffer      = require('vinyl-buffer');
const source      = require('vinyl-source-stream');
const rename      = require('gulp-rename');
const livereload  = require('gulp-livereload');
const log         = require('fancy-log');
const colors      = require('ansi-colors');

function onError( err, pipeline ) {
  log( colors.red( `Error: ${ err.message }` ) );
  import('beeper').then(module => module.default());
  pipeline.emit('error', err);
}

function buildFull() {
  let pipeline;
  return pipeline = rollup({
      entry: 'src/js/main.js', format: 'iife', sourceMap: true
    })
    .on( 'error', err => onError( err, pipeline ) )
    .pipe( source( 'main.js', './src' ) )
    .pipe( buffer() )
    .pipe( srcmaps.init({ loadMaps: true }) )
    .pipe( srcmaps.write( './' ) )
    .pipe( gulp.dest('./dist') )
    .pipe( livereload({}) );
}

function buildMin() {
  let pipeline;
  return pipeline = gulp.src('./dist/main.js')
    .pipe( terser() )
    .on( 'error', err => onError( err, pipeline ) )
    .pipe( rename('main.min.js') )
    .pipe( gulp.dest('./dist') );
}

exports.build = gulp.series(buildFull, buildMin)
