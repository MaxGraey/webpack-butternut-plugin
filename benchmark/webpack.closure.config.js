'use strict'

const path    = require('path');
const webpack = require('webpack');
const ClosurePlugin = require('webpack-closure-compiler');

const rootDir = __dirname;
const entry   = path.join('..', 'samples', 'jquery.uncompress.js');
const output  = 'jquery.closure.min.js';

module.exports = function (esVersion = 5) {
    return {
        entry: path.join(rootDir, entry),
        output: {
            path:              path.join(rootDir, 'dist'),
            filename:          output,
            sourceMapFilename: '[name].closure.map'
        },
        resolve: {
            extensions: ['.js', '.json']
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(true),
            new ClosurePlugin({
                compiler: {
                    language_in:       'ECMASCRIPT' + esVersion,
                    language_out:      'ECMASCRIPT' + esVersion,
                    compilation_level: 'ADVANCED'
                },
                concurrency: 4
            })
        ]
    };
};
