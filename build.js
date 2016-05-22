const fs = require('fs'),
    beautify = require('js-beautify').js_beautify,
    ClosureCompiler = require('google-closure-compiler').compiler,
    babel = require("babel-core");

let closureCompiler = new ClosureCompiler({
  js: './dist/Crafter.js',
  compilation_level: 'SIMPLE',
  language_in: 'ES5',
  language_out: 'ECMASCRIPT5_STRICT',
});

process.argv.forEach((val, index, array) => {
    console.log(`${index}: ${val}`);
});

babel.transformFile("./src/Crafter.js", {
    plugins: [
        "transform-es2015-template-literals",
        "transform-es2015-literals",
        //"transform-es2015-function-name",
        //"transform-es2015-for-of",
        "transform-merge-sibling-variables",
        "transform-es2015-arrow-functions",
        "transform-es2015-block-scoped-functions",
        "transform-es2015-classes",
        "transform-es2015-object-super",
        "transform-es2015-shorthand-properties",
        "transform-es2015-duplicate-keys",
        "transform-es2015-computed-properties",
        "transform-es2015-sticky-regex",
        "transform-es2015-unicode-regex",
        "transform-es2015-spread",
        "transform-es2015-parameters",
        "transform-es2015-destructuring",
        "transform-es2015-block-scoping",
        "transform-es2015-typeof-symbol",
    ],
    compact : true,
}, (err, result) => {
    if (err) throw err;
    let beautifiedCode = beautify(result.code, { indent_size: 2 });
    fs.writeFile('./dist/Crafter.js',beautifiedCode, 'utf8', err => {
        if (err) throw err;
        console.log('Success -> Crafter.js Babelized!\n');

        closureCompiler.run((exitcode, out, err) => {
          if (err) console.log(err);
          fs.writeFile('./dist/' + 'Crafter' + '.min.js',out, 'utf8', err => {
              if (err) throw err;
              console.log('Success -> Crafter.js Babelized and Minified!\n')
          });
        });

    });
});
