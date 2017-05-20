'use strict'

const path    = require('path');
const webpack = require('webpack');
const ButternutPlugin = require('../index');

const rootDir = __dirname;
const entry   = path.join('..', 'samples', 'jquery.uncompress.js');
const output  = 'jquery.min.js';

const config = {
    entry: path.join(rootDir, entry),
    output: {
        path:              path.join(rootDir, 'dist'),
        filename:          output,
        sourceMapFilename: '[name].map'
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new ButternutPlugin()
    ]
};

module.exports = config;
