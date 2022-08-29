'use strict';

const gulp        = require('gulp');
const handlebars  = require('handlebars');
const fs          = require('fs-extra');
const srcmaps     = require('gulp-sourcemaps');
const buffer      = require('vinyl-buffer');
const source      = require('vinyl-source-stream');
const buildTasks  = require('./build.js');
const cssTasks    = require('./css.js');

function getJS() {
  return readFile('./dist/main.min.js');
}

function getReleaseJS() {
  return readFile('./dist/main.release.min.js');
}

function getCSS() {
  return readFile('./dist/main.css');
}

function writeFile( fname, data ) {
  return new Promise(( resolve, reject ) => {
    fs.writeFile( fname, data, err => {
      if ( err ) {
        return reject( err );
      }
      resolve();
    });
  });
}

function readFile( fname ) {
  return new Promise(( resolve, reject ) => {
    fs.readFile( fname, ( err, data ) => {
      if ( err ) {
        return reject( err );
      }
      resolve( data.toString('utf8') );
    });
  });
}

function template() {
  let ctx = {};

  return getJS()
  .then( js => ctx.js = js )
  .then( () => getCSS() )
  .then( css => ctx.css = css )
  .then( () => readFile( './src/index.hbs') )
  .then( str => {
    // development index.html
    let result = handlebars.compile( str )();
    return writeFile( './dist/index.html', result )
  });
};

function templateRelease() {
  let ctx = {};

  return getReleaseJS()
  .then( js => ctx.js = js )
  .then( () => getCSS() )
  .then( css => ctx.css = css )
  .then( () => readFile( './src/index.hbs') )
  .then( str => {
    // Inline/minified index file
    let inlineResult = handlebars.compile( str )
      ({ js: ctx.js, css: ctx.css });

    return writeFile('./dist/index.min.html', inlineResult);
  })
  .then(() => fs.ensureDir('./docs')) // ensure docs folder
  .then(() => {
    // copy for github page
    return fs.copyFile('./dist/index.min.html', './docs/index.html')
  });
}

exports.template = template;
exports.templateRelease = templateRelease;
