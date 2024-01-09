const fs = require('fs');

const items = require('./doc.json');

if (!fs.existsSync('res')) fs.mkdirSync('res');

const builtInTypes = new Set(['string', 'number', 'boolean', 'true']);

const ignoreList = [
    'InputFile',
    'WebhookInfo',
];

const wrapLimit = 108;
const wrapText = (text, prefix) => {
    if (text.includes('\n')) return text.split('\n').map(line => wrapText(line, prefix)).join('\n');

    const lines = [];
    while (text.length > wrapLimit) {
        const pos = text.lastIndexOf(' ', wrapLimit);

        lines.push(`${prefix}${text.substring(0, pos)}`);
        text = text.substring(pos + 1);
    }
    lines.push(`${prefix}${text}`);

    return lines.join('\n');
};

const normalizeType = type => type.replace(/(\[])+/img, '');

const isBuiltInType = type => builtInTypes.has(type);

const generateImports = (items, prefix = './') => {
    const typesSet = new Set();

    for (const item of items) {
        item.type.split(' | ').map(normalizeType).forEach(type => typesSet.add(type));
    }

    return [...typesSet]
        .filter(type => !isBuiltInType(type))
        .map(type => `import type { ${type} } from '${prefix}${type}';`).
        join('\n');
};

const generateInterface = (item) => {
    const imports = generateImports(item.items);

    return `${imports ? `${imports}\n\n` : ''}/**\n * ${item.description.join('\n *\n * ')}\n */\nexport interface ${item.name} {
    ${item.items.map(({ name, type, description }) => {
        const isOptional = description.startsWith('Optional. ');
        return `/**\n\t * ${description.replace(/^Optional\. /i, '')}\n\t */\n\t${name}${isOptional ? '?' : ''}: ${type};`;
    }).join('\n\n\t')}
}
`.replace(/\t/img, '    ');
};

const methods = [];

for (const item of items) {
    if (item.type === 'object') {
        const code = generateInterface(item);
        fs.writeFileSync(`res/${item.name}.ts`, code, { encoding: 'utf-8' });
    }
}
// const generateMethods = () => {
//     const methods = items.filter(item => item.type === 'method');
//     const allParams = methods.map(method => method.items).flat();
//     const imports = generateImports(allParams, '@typings/');
//
//     const code = methods
//         .map(({ name, items, description }) => {
//             const params = items.map(({name, type, description, required}) => {
//                 return `\t/**\n${wrapText(description, '\t * ')}\n\t */\n\t${name}${required ? '' : '?'}: ${type};`;
//             }).join('\n\n');
//
//             return `/**\n${description.map(line => wrapText(line, ' * ')).join('\n *\n')}\n */\npublic ${name}(params: {
// ${params}
// }): Promise<unknown> {\n\treturn this.request('${name}', params);\n}`;
//         })
//         .join('\n\n')
//         .split('\n')
//         .map(line => !line.trim() ? line : `    ${line}`)
//         .join('\n')
//         .replace(/\t/img, '    ');
//     return `${imports}\n\nclass BotApi {\n\tpublic constructor(protected readonly request: <T>(method: string, params: object) => Promise<T>) {}\n\n${code}\n}\n`;
// };
// const code = generateMethods();
// fs.writeFileSync(`methods.ts`, code, { encoding: 'utf-8' });
