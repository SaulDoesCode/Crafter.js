"use strict";

var gulp = require('gulp'),
  fs = require('fs'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  minCss = require('gulp-minify-css'),
  documentation = require('gulp-documentation'),
  rename = require('gulp-rename'),
  babel = require("gulp-babel"),
  docs = './documentation';

gulp.task('document', function () {

  gulp.src('./src/Crafter.js')
    .pipe(documentation({
      format: 'json'
    }))
    .pipe(gulp.dest(docs));

  gulp.src('./src/Crafter.js')
    .pipe(documentation({
      format: 'html'
    }))
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

gulp.task('BabelUgly', () => gulp.src('./src/*.js').pipe(babel({
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
  }))
  .pipe(gulp.dest('./dist/min/')));

gulp.task('babelize_webcomponents', () => gulp.src(['./src/pre-webcomponents/*.js', '!./src/pre-webcomponents/*-extra.js'])
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

gulp.task('min-extrab-bs', () => gulp.src('./src/pre-webcomponents/*-extra.js').pipe(uglify({
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


gulp.task('mincss', () => gulp.src('./src/pre-webcomponents/*.css').pipe(minCss({
  compatibility: ''
})).pipe(rename({
  extname: ".mss"
})).pipe(gulp.dest('./src/pre-webcomponents/')));


gulp.task('build_webcomponents', ['mincss','min-extrab-bs', 'babelize_webcomponents'], () => {
  var FileNames = [],
    Path = './src/pre-webcomponents/',
    files = fs.readdirSync(Path);
  files.forEach(file => {
    if (file.includes('.bs') && files.indexOf(file.substring(0, file.length - 3) + '.mss') !== -1) {
      FileNames.push(file.substring(0, file.length - 3));
      console.log(file.substring(0, file.length - 3));
    }
  });
  FileNames.forEach(FileName => {
    let ScriptFile, StyleFile, WebComponentInner, path = Path + FileName;
    if (fs.statSync(path + '.mss').isFile() && fs.statSync(path + '.bs').isFile()) {

      StyleFile = fs.readFileSync(path + '.mss', 'utf8');
      ScriptFile = fs.readFileSync(path + '.bs', 'utf8');
      try {
        if (fs.statSync(path + '-extra.bs').isFile() === true) {
          console.log(FileName + ' has extra.bs');
          ScriptFile = fs.readFileSync(path + '-extra.bs', 'utf8') + '\n' + ScriptFile;
        }
      } catch (e) {}


      WebComponentInner = JSON.stringify({
        name: FileName,
        css: StyleFile,
        js: ScriptFile
      });

      fs.writeFile('./dist/WebComponents/' + FileName + '.wc', WebComponentInner, 'utf8', err => err ? console.error(err) : console.log('Success -> WebComponents Created! '));
      try {
        fs.unlinkSync(path + '.mss');
        fs.unlinkSync(path + '.bs');
        if (fs.statSync(path + '-extra.bs').isFile() === true) fs.unlinkSync(path + '-extra.bs');
      } catch (e) {}

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
