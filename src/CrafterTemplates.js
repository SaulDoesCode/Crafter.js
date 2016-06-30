Craft.exec(() => {
'use strict';
    const {
        has,
        degloveStr,
        getPath,
        is
    } = Craft;

    const curlytemplate = /(\{\{(?:\s|\S)*?[\.\S]*\}\})/g,
        squaretemplate = /(\[\[(?:\s|\S)*?[\.\S]*\]\])/g,
        ternary = /^([\S\s]*)(?:\?)([\S\s]*)(?:\:)([\s\S]*)$/gm,
        comparisons = /([a-zA-Z0-9\.\'\"]{1,})(?:(?:\s{1,}?)([=!><\|&]{1,3})(?:\s{1,}?))([a-zA-Z0-9\.\'\"]{1,})/gm;

    function hasComparator(str) {
        return ['==', '===', '!=', '!==', '||', '&&', '>=', '<', '>', '<='].some(str.includes.bind(str));
    }

    function compileComparision(comp) {
        let comparison = comp.replace(comparisons, (m, left, comparator, right) => {
            left = getPath(left);
            right = getPath(right);
            if (['==', '==='].some(c => c === comparator)) return left === right;
            if (['!=', '!=='].some(c => c === comparator)) return left !== right;
            if ('||' === comparator) return left || right;
            if (comparator === '&&') return left && right;
            if (comparator === '<') return left < right;
            if (comparator === '>') return left > right;
            if (comparator === '<=') return left <= right;
            if (comparator === '>=') return left >= right;
            return '';
        });
        if (comparison === 'true') return true;
        else if (comparison === 'false') return false;
        else return getPath(comparison) == true;
    }

    function helperToSlices(string) {
        let shiftIndex, i, j, slices = [],
            helperParts = string.replace(/[{}#}]/g, '').split(' ');
        for (i = 0; i < helperParts.length; i++) {
            let part = helperParts[i];
            if (i === 0) slices.push(part);
            else {
                if (part.indexOf('"') === 0) {
                    // Plain String
                    if (part.match(/"/g).length === 2) slices.push(part); // One word string
                    else {
                        // Find closed Index
                        shiftIndex = 0;
                        for (j = i + 1; j < helperParts.length; j++) {
                            part += ' ' + helperParts[j];
                            if (helperParts[j].indexOf('"') >= 0) {
                                shiftIndex = j;
                                slices.push(part);
                                break;
                            }
                        }
                        if (shiftIndex) i = shiftIndex;
                    }
                } else {
                    if (part.indexOf('=') > 0) {
                        // Hash
                        let hashParts = part.split('='),
                            hashName = hashParts[0],
                            hashContent = hashParts[1];
                        if (hashContent.match(/"/g).length !== 2) {
                            shiftIndex = 0;
                            for (j = i + 1; j < helperParts.length; j++) {
                                hashContent += ' ' + helperParts[j];
                                if (helperParts[j].includes('"')) {
                                    shiftIndex = j;
                                    break;
                                }
                            }
                            if (shiftIndex) i = shiftIndex;
                        }
                        slices.push([hashName, hashContent.replace(/"/g, '')]);
                    } else slices.push(part); // Plain variable
                }
            }
        }
        return slices;
    }

    function stringToBlocks(string) {
        let blocks = [],
            i, j, k;
        if (!string) return [];
        let pieces = string.split(/({{[^{^}]*}})/);
        for (i = 0; i < pieces.length; i++) {
            let block = pieces[i];
            if (block === '') continue;
            if (block.indexOf('{{') < 0) {
                blocks.push({
                    type: 'plain',
                    content: block
                });
            } else {
                if (block.includes('{/')) continue;
                if (!block.includes('{#') && block.indexOf(' ') < 0 && !block.includes('else')) {
                    // Simple variable
                    blocks.push({
                        type: 'variable',
                        contextName: block.replace(/[{}]/g, '')
                    });
                    continue;
                }
                // Helpers
                let helperSlices = helperToSlices(block),
                    helperName = helperSlices[0],
                    isPartial = helperName === '>',
                    helperContext = [],
                    helperHash = {};
                for (j = 1; j < helperSlices.length; j++) {
                    let slice = helperSlices[j];
                    // Hash
                    is.Arr(slice) ? helperHash[slice[0]] = slice[1] === 'false' ? false : slice[1] : helperContext.push(slice);
                }

                if (block.indexOf('{#') >= 0) {
                    // Condition/Helper
                    let helperStartIndex = i,
                        helperContent = '',
                        elseContent = '',
                        toSkip = 0,
                        shiftIndex,
                        foundClosed = false,
                        foundElse = false,
                        foundClosedElse = false,
                        depth = 0;
                    for (j = i + 1; j < pieces.length; j++) {
                        if (pieces[j].includes('{{#')) depth++;
                        if (pieces[j].includes('{{/')) depth--;

                        if (pieces[j].includes('{{#' + helperName)) {
                            helperContent += pieces[j];
                            if (foundElse) elseContent += pieces[j];
                            toSkip++;
                        } else if (pieces[j].includes('{{/' + helperName)) {
                            if (toSkip > 0) {
                                toSkip--;
                                helperContent += pieces[j];
                                if (foundElse) elseContent += pieces[j];
                            } else {
                                shiftIndex = j;
                                foundClosed = true;
                                break;
                            }
                        } else if (pieces[j].includes('else') && depth === 0) foundElse = true;
                        else {
                            if (!foundElse) helperContent += pieces[j];
                            if (foundElse) elseContent += pieces[j];
                        }

                    }
                    if (foundClosed) {
                        if (shiftIndex) i = shiftIndex;
                        blocks.push({
                            type: 'helper',
                            helperName: helperName,
                            contextName: helperContext,
                            content: helperContent,
                            inverseContent: elseContent,
                            hash: helperHash
                        });
                    }
                } else if (block.indexOf(' ') > 0) {
                    if (isPartial) {
                        helperName = '_partial';
                        if (helperContext[0]) helperContext[0] = '"' + helperContext[0].replace(/"|'/g, '') + '"';
                    }
                    blocks.push({
                        type: 'helper',
                        helperName: helperName,
                        contextName: helperContext,
                        hash: helperHash
                    });
                }
            }
        }
        return blocks;
    }
    const emptystr = () => '';

    function templates(template) {
        const t = this,
            getCompileFn = (block, depth) => block.content ? compile(block.content, depth) : emptystr,
            getCompileInverse = (block, depth) => block.inverseContent ? compile(block.inverseContent, depth) : emptystr;
        t.template = template;

        function getCompileVar(name, ctx) {
            return Craft.getDeep(ctx, name);
        }

        function getCompiledArguments(contextArray, ctx) {
            let arr = [];
            contextArray.forEach(item => {
                arr.push(item.indexOf('"') === 0 ? item : getCompileVar(item, ctx));
            });
            return arr;
        }

        function compile(template, depth) {
            depth = depth || 1;
            template = template || t.template;
            if (!is.Str(template)) {
                if (is.Node(template)) template = template.innerHTML;
                else throw new Error('Crafter templates: Template must be a string');
            }

            let blocks = stringToBlocks(template);
            if (blocks.length === 0) return () => '';

            function compiler(ctx, data, root) {
                if (depth === 1) root = root || ctx || {};
                let r = '';
                blocks.forEach(block => {
                    // Plain block
                    if (block.type === 'plain') {
                        r += block.content
                        return;
                    }
                    let variable, compiledArguments;
                    // Variable block
                    if (block.type === 'variable') {
                        variable = getCompileVar(block.contextName, ctx);
                        r += Craft.templates.c(variable, ctx);
                    }
                    // Helpers block
                    if (block.type === 'helper') {
                        if (block.helperName in t.helpers) {
                            compiledArguments = Craft.flatten([getCompiledArguments(block.contextName, ctx), {
                                hash: JSON.stringify(block.hash),
                                data: data || {},
                                fn: getCompileFn(block, depth + 1),
                                inverse: getCompileInverse(block, depth + 1),
                                root: root
                            }]);
                            r += Craft.templates.helpers[block.helperName].apply(ctx, compiledArguments);
                        } else {
                            if (block.contextName.length > 0) throw new Error(`Craft.templates: Missing helper: "${block.helperName}"`);
                            else {
                                variable = getCompileVar(block.helperName, ctx);
                                if (variable) r += (Craft.templates.helpers[is.Arr(variable) ? 'each' : 'with'].call(ctx, variable, {
                                    hash: JSON.stringify(block.hash),
                                    data: data || {},
                                    fn: getCompileFn(block, depth + 1),
                                    inverse: getCompileInverse(block, depth + 1),
                                    root: root
                                }));
                            }
                        }
                    }
                });
                return r;
            };

            return compiler;
        }
        t.compile = template => t.compiled ? t.compiled : (t.compiled = compile(template));
    };
    templates.prototype = {
        options: {},
        partials: {},
        helpers: {
            _partial(partialName, options) {
                let p = templates.prototype.partials[partialName];
                if (!p || (p && !p.template)) return '';
                if (!p.compiled) p.compiled = this.compile(p.template);
                let ctx = this;
                for (let hashName in options.hash) ctx[hashName] = options.hash[hashName];
                return p.compiled(ctx, options.data, options.root);
            },
            'escape': (context, options) => {
                if (!is.Str(context)) throw new Error('Crafter templates: context given to "escape" helper should be string');
                return context
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;');
            },
            'if': function (context, options) {
                if (is.Func(context)) context = context.call(this);
                return options[context ? 'fn' : 'inverse'](this, options.data);
            },
            unless(context, options) {
                if (is.Func(context)) context = context.call(this);
                return options[context ? 'inverse' : 'fn'](this, options.data);
            },
            each(context, options) {
                let ret = '',
                    i = 0;
                if (is.Func(context)) context = context.call(this);
                if (is.Arr(context)) {
                    if (options.hash.reverse) context = context.reverse();
                    for (i = 0; i < context.length; i++) {
                        ret += options.fn(context[i], {
                            first: i === 0,
                            last: i === context.length - 1,
                            index: i
                        });
                    }
                    if (options.hash.reverse) context = context.reverse();
                } else {
                    for (let key in context) {
                        i++;
                        ret += options.fn(context[key], {
                            key: key
                        });
                    }
                }
                return i > 0 ? ret : options.inverse(this);
            },
            with(context, options) {
                if (is.Func(context)) context = context.call(this);
                return options.fn(context);
            },
            join(context, options) {
                if (is.Func(context)) context = context.call(this);
                return context.join(options.hash.delimiter || options.hash.delimeter);
            },
            js(expression) {
                return new Function(`${expression.includes('return') ? 'return' : ''} ${expression}`).call(this);
            },
            compare(expression, options) {
                return options[(new Function(`${expression.includes('return') ? 'return' : ''} ${expression}`).call(this)) ? 'fn' : 'inverse'](this, options.data);
            },
        }
    };
    const Ct = (template, data) => !data ? (new templates(template).compile()(data)) : new templates(template);
    Ct.c = (val, ctx) => (is.Def(val) && val !== null) ? is.Func(val) ? val.call(ctx) : val : "";
    Ct.registerHelper = (name, fn) => (templates.prototype.helpers[name] = fn);
    Ct.unregisterHelper = name => {
        templates.prototype.helpers[name] = undefined;
        delete templates.prototype.helpers[name];
    };
    Ct.registerPartial = (name, template) => {
        templates.prototype.partials[name] = {
            template
        };
    };
    Ct.unregisterPartial = (name, template) => {
        if (templates.prototype.partials[name]) {
            templates.prototype.partials[name] = undefined;
            delete templates.prototype.partials[name];
        }
    };
    Ct.compile = (template, options) => new templates(template, options).compile();
    Ct.options = templates.prototype.options;
    Ct.helpers = templates.prototype.helpers;
    Ct.partials = templates.prototype.partials;

    Craft.directive('craft-template', {
        bind(element, val) {
            element.replace(Craft.dffstr(Craft.templates(element.innerHTML)(Craft.fromModel(val))));
        }
    });

    Craft.templates = Ct;
});
