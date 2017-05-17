
const path    = require('path');
const webpack = require('webpack');
const ButternutPlugin = require('../index');

const entry   = 'jquery.uncompress.js';
const rootDir = __dirname;

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
        new ButternutPlugin(),
        /*new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$super', '$', '_']
            },

            squeeze:   true,
            minimize:  true,
            sourceMap: false,
            warnings:  false,

            compress: {
                dead_code   : true,
                screw_ie8   : true,
                sequences   : true,
                booleans    : true,
                loops       : true,
                evaluate    : true,
                unused      : true,
                warnings    : false,
                drop_console: false,
                unsafe      : true,
                reduce_vars : true,
                join_vars   : true,
                comparisons : true,
                conditionals: true,
                properties  : true,
                if_return   : true
            },

            output: {
                comments: false
            }
        })*/
    ]
};

module.exports = config;
