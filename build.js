const fs = require('fs'),
    CleanCSS = require('clean-css'),
    beautify = require('js-beautify').js_beautify,
    ClosureCompiler = require('google-closure-compiler').compiler,
    babel = require("babel-core");

let BabelOptions = {
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
    compact: true,
}, wcPath = "./src/pre-webcomponents/"

function babelize(code) {
    return babel.transform(code, BabelOptions).code;
}

function mincss(css) {
    return new CleanCSS().minify(css).styles
}

function transformWC(name, js, css, outloc) {

    fs.writeFile(outloc + name + '.pwc', `Craft.addCSS("${mincss(css)}");\n${babelize(js)}`, 'utf8', err => {
        if (err) throw err;

        let closureCompiler = new ClosureCompiler({
            js: outloc + name + '.pwc',
            compilation_level: 'SIMPLE',
            language_in: 'ECMASCRIPT5_STRICT',
            language_out: 'ECMASCRIPT5_STRICT',
        });

        closureCompiler.run((exitcode, out, err) => {
            fs.writeFile(outloc + name + '.js', out, 'utf8', err => {
                if (err) throw err;
                try {
                    fs.unlinkSync(outloc + name + '.pwc');
                    console.log('Succesfully compiled ' + name + ' web component!');
                } catch (e) {}
            });
        });
    });

}

function BabelizeBeatifyMinify(inloc, outloc) {

    let closureCompiler = new ClosureCompiler({
        js: outloc,
        compilation_level: 'SIMPLE',
        language_in: 'ECMASCRIPT5_STRICT',
        language_out: 'ECMASCRIPT5_STRICT',
    });


    babel.transformFile(inloc, BabelOptions, (err, result) => {
        if (err) throw err;
        let beautifiedCode = beautify(result.code, {
            indent_size: 2
        });
        fs.writeFile(outloc, beautifiedCode, 'utf8', err => {
            if (err) throw err;
            console.log('Success -> Crafter.js Babelized!\n');

            closureCompiler.run((exitcode, out, err) => {
                if (err) console.log(err);
                fs.writeFile(outloc.replace('.js', '.min.js'), out, 'utf8', err => {
                    if (err) throw err;
                    console.log('Success -> Crafter.js Babelized and Minified!\n')
                });
            });

        });
    });

}

process.argv.forEach((val, index, array) => {
    if (val == 'wc') {
        let files = fs.readdirSync(wcPath);
        files.forEach(file => {
            if (file.includes('.js')) {
                let name = file.replace('.js', '');
                if (files.includes(name + '.css')) {
                    transformWC(name, fs.readFileSync(wcPath + name + '.js', 'utf8'), fs.readFileSync(wcPath + name + '.css', 'utf8'), './dist/WebComponents/');
                }
            }
        });
    } else if (val == 'watchWC') {
        fs.watch("./src/pre-webcomponents/", (event, filename) => {
            if (filename) {
              if (filename.includes('.js')) {
                  let name = filename.replace('.js', '');
                  if (fs.statSync(wcPath + name + '.css').isFile()) {
                      transformWC(name, fs.readFileSync(wcPath + name + '.js', 'utf8'), fs.readFileSync(wcPath + name + '.css', 'utf8'), './dist/WebComponents/');
                  }
              } else if(filename.includes('.css')) {
                let name = filename.replace('.css', '');
                if (fs.statSync(wcPath + name + '.js').isFile()) {
                    transformWC(name, fs.readFileSync(wcPath + name + '.js', 'utf8'), fs.readFileSync(wcPath + name + '.css', 'utf8'), './dist/WebComponents/');
                }
              }
            }
        });
    } else if (index === array.length - 1 && !array.includes('wc')) BabelizeBeatifyMinify("./src/Crafter.js", "./dist/Crafter.js");
});
