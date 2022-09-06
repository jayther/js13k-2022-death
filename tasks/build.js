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
const replace     = require('@rollup/plugin-replace');

function onError( err, pipeline ) {
  log( colors.red( `Error: ${ err.message }` ) );
  import('beeper').then(module => module.default());
  pipeline.emit('error', err);
}

function buildFull(outputName = undefined, releaseEngine = false) {
  const plugins = releaseEngine ? [
    replace({
      'engine.all': 'engine.all.release',
    }),
  ] : undefined;

  let pipeline;
  pipeline = rollup({
    input: 'src/js/main.js', format: 'iife', sourcemap: true,
    plugins,
  })
  .on( 'error', err => onError( err, pipeline ) )
  .pipe( source( 'main.js', './src' ) )
  .pipe( buffer() );

  if (outputName) {
    pipeline = pipeline.pipe( rename('main.release.js'))
  }

  pipeline = pipeline.pipe( srcmaps.init({ loadMaps: true }) )
  .pipe( srcmaps.write( './' ) )
  .pipe( gulp.dest('./dist') )
  .pipe( livereload({}) );

  return pipeline;
}

function buildMin(input, minOutputName) {
  let pipeline;
  return pipeline = gulp.src(input)
    .pipe( terser({
      mangle: {
        properties: {}, // defining an empty properties obj will mangle the properties
      },
    }) )
    .on( 'error', err => onError( err, pipeline ) )
    .pipe( rename(minOutputName) )
    .pipe( gulp.dest('./dist') );
}

function buildDevFull() {
  return buildFull();
}

function buildDevMin() {
  return buildMin('./dist/main.js', 'main.min.js');
}

function buildReleaseFull() {
  return buildFull('main.release.js', true);
}

function buildReleaseMin() {
  return buildMin('./dist/main.release.js', 'main.release.min.js');
}

exports.build = gulp.series(buildDevFull, buildDevMin)
exports.buildRelease = gulp.series(buildReleaseFull, buildReleaseMin)
