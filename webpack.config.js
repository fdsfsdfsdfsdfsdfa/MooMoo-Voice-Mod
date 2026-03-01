const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackUserscript = require('webpack-userscript');
const info = require('./src/config/info.json');

module.exports = {
    target: 'web',
    entry: {
        'client/MooMooVoice': './src/client/index.ts',
        'server/MooMooVoice': './src/server/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new WebpackUserscript({
            headers: {
                name: info.name,
                version: info.version,
                description: info.description,
                author: info.author,
                match: info.match,
                'run-at': info["run-at"],
                grant: info.grant
            },
            proxyScript: {
                enable: false
            }
        })
    ],
    optimization: {
        minimize: false
    }
};
