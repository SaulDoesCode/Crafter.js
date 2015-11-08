"use strict";

var gulp = require('gulp'),
  fs = require('fs'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  babel = require("gulp-babel");

gulp.task('babel', function () {
  gulp.src('./src/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/'));
  console.log('\t babel be done!');
});

gulp.task('BabelUgly', function () {
  gulp.src('./src/*.js')
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
        comments: true
      }
    }))
    .pipe(gulp.dest('./dist/min/'));
});

gulp.task('babelize_webcomponents', function () {
  gulp.src('./src/pre-webcomponents/*.js')
    .pipe(babel({
      presets: ['es2015']
    })).pipe(gulp.dest('./src/pre-webcomponents/babelized/'));
});


gulp.task('build_webcomponents', ['babelize_webcomponents'], function () {
  var FileNames = ['CrafterWidgets'];
  FileNames.forEach(FileName => {
    var ScriptFile, StyleFile;
    if (fs.statSync('./src/pre-webcomponents/' + FileName + '.css').isFile() && fs.statSync('./src/pre-webcomponents/babelized/' + FileName + '.js').isFile()) {

      StyleFile = fs.readFileSync('./src/pre-webcomponents/' + FileName + '.css', 'utf8');
      ScriptFile = fs.readFileSync('./src/pre-webcomponents/babelized/' + FileName + '.js', 'utf8');

      var WebComponentInner = '<script type="text/javascript">\n\t' + ScriptFile + '</script>\n<style>\n\t' + StyleFile + '\n</style>';
      fs.writeFile('./dist/WebComponents/' + FileName + '.html', WebComponentInner, 'utf8', err => {
        if (err) console.error(err);
        console.log('Success -> WebComponents Created!');
      });

    } else {
      console.error("Can't make WebComponent no matching files");
    }
  });
});

gulp.task('watchWebComponents',function() {
  gulp.watch(['./src/pre-webcomponents/*.js','./src/pre-webcomponents/*.css'],['build_webcomponents']);
});


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
