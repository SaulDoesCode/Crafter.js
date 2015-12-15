"use strict";

var gulp = require('gulp'),
  fs = require('fs'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  documentation = require('gulp-documentation'),
  rename = require('gulp-rename'),
  babel = require("gulp-babel"),
  docs = './documentation';

  gulp.task('document', function () {

    gulp.src('./src/Crafter.js')
      .pipe(documentation({ format: 'json' }))
      .pipe(gulp.dest(docs));

    gulp.src('./src/Crafter.js')
      .pipe(documentation({ format: 'html' }))
      .pipe(gulp.dest(docs));
  });

gulp.task('babel', function () {
  gulp.src('./src/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/'));
  console.log('\t babel be done!');
});

gulp.task('BabelUgly', () => gulp.src('./src/*.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(uglify({
    mangle: true,
    compress: true,
    compressor: {
      if_return: true,
      loops: true,
      conditionals: true,
      comparisons: true,
      sequences: true
    },
    output: {
      comments: false
    }
  }))
  .pipe(gulp.dest('./dist/min/')));

gulp.task('babelize_webcomponents', () => gulp.src('./src/pre-webcomponents/*.js')
  .pipe(babel({
    presets: ['es2015']
  })).pipe(uglify({
      mangle: true,
      compress: true,
      compressor: {
        if_return: true,
        loops: true,
        conditionals: true,
        comparisons: true,
        sequences: true
      },
      output: {
        comments: false
      }
    })).pipe(rename({
    extname: ".bs"
  })).pipe(gulp.dest('./src/pre-webcomponents/')));


gulp.task('build_webcomponents', ['babelize_webcomponents'], function () {
  var FileNames = [],
    files = fs.readdirSync('./src/pre-webcomponents/');
  files.forEach((file, i) => {
    if (file.includes('.bs') && files.indexOf(file.substring(0, file.length - 3) + '.css') !== -1) {
      FileNames.push(file.substring(0, file.length - 3));
      console.log(file.substring(0, file.length - 3));
    }
  });
  FileNames.forEach(FileName => {
    let ScriptFile, StyleFile, WebComponentInner;
    if (fs.statSync('./src/pre-webcomponents/' + FileName + '.css').isFile() && fs.statSync('./src/pre-webcomponents/' + FileName + '.bs').isFile()) {

      StyleFile = fs.readFileSync('./src/pre-webcomponents/' + FileName + '.css', 'utf8');
      ScriptFile = fs.readFileSync('./src/pre-webcomponents/' + FileName + '.bs', 'utf8');

      WebComponentInner = JSON.stringify({
        name: FileName,
        css: StyleFile,
        js: ScriptFile
      });

      fs.writeFile('./dist/WebComponents/' + FileName + '.wc', WebComponentInner, 'utf8', err => {
        if (err) console.error(err);
        console.log('Success -> WebComponents Created! ');
      });
    } else console.error("Can't make WebComponent no matching files");
  });
});

gulp.task('watchWebComponents', () => gulp.watch(['./src/pre-webcomponents/*.js', './src/pre-webcomponents/*.css'], ['build_webcomponents']));
gulp.task('watchSource', () => gulp.watch('./src/*.js', ['babel']));

gulp.task('polyfills', function () {
  gulp.src('./polyfills/*.js')
    .pipe(concat('polyfills.min.js'))
    .pipe(uglify({
      mangle: true,
      compress: true,
      compressor: {
        if_return: true,
        loops: true,
        conditionals: true,
        comparisons: true,
        sequences: true
      },
      output: {
        comments: true
      }
    })).pipe(gulp.dest('./dist'));
  console.log('polyfill bundelling be done!');
});

gulp.task('default', ['babel']);
