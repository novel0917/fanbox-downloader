const path = require('path');
const { execFileSync } = require('child_process');
const webpack = require('webpack');

const buildBranch =
    process.env.GITHUB_HEAD_REF ||
    process.env.GITHUB_REF_NAME ||
    execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim() ||
    'detached';

module.exports = {
    mode: "production",
    entry: './fanbox-downloader.ts',
    output: {
        filename: 'fanbox-downloader.min.js',
        path: path.resolve(__dirname, 'docs'),
        library: {
            type: 'module',
        },
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader'
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    experiments: {
        outputModule: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            BUILD_BRANCH: JSON.stringify(buildBranch),
        }),
    ],
}
