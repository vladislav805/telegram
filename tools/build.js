const path = require('path');
const esbuild = require('esbuild');

esbuild.build({
    entryPoints: [path.resolve('src', 'index.ts')],
    outfile: path.resolve('dist', 'index.js'),
    charset: 'utf8',
    bundle: true,
    platform: 'node',
    sourcemap: true,
    minify: true,
    target: ["node10.4"],
}).catch(() => process.exit(1));
