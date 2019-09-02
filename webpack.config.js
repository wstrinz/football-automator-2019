const path = require('path');
var webpack = require("webpack");
var fs = require("fs");

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'script.user.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new webpack.BannerPlugin({banner: fs.readFileSync('./script_header.js', 'utf8'), raw: true}),
    ]
};