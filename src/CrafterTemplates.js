Craft.init(() => {
    const {has,degloveStr,getPath,is} = Craft;

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

    function parseTemplate(html) {
        return html.replace(curlytemplate, (template, text, offset, string) => {
            template = template.replace(/{{/, '').replace('}}', '');
            let val, isTernary = ternary.test(template);
            if (has(template, `'"`, true) && !hasComparator(template) && !isTernary) return degloveStr(template);
            else if (hasComparator(template) || isTernary) {
                if (isTernary) return template.replace(ternary, (m, test, True, False) => {
                    test = compileComparision(test.trim());
                    let path = test ? True : False,
                        val = getPath(path);
                    if (has(val, `'"`, true)) val = degloveStr(val);
                    return !has(path, `'"`, true) ? `<o bind="${path}">${val == undefined ? '' : val}</o>` : val;
                });
                return compileComparision(template);
            } else val = getPath(template);
            if (is.empty(val)) {

            }
            return `<o bind="${template}">${val == undefined ? '' : val}</o>`;
        }).replace(squaretemplate, match => {
            try {
                return new Function(match.replace(/\[\[/, '').replace(']]', ''))() || '';
            } catch (e) {
                return '';
            }
        });
    }

    Craft.customAttr('craft-template', element => {
        element.replace(Craft.dffstr(parseTemplate(element.html())));
    });

});
