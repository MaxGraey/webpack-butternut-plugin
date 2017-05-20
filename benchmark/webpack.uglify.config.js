'use strict'

const path    = require('path');
const webpack = require('webpack');

const rootDir = __dirname;
const entry   = path.join('..', 'samples', 'jquery.uncompress.js');
const output  = 'jquery.uglify.min.js';

module.exports = function () {
    return {
        entry: path.join(rootDir, entry),
        output: {
            path:              path.join(rootDir, 'dist'),
            filename:          output,
            sourceMapFilename: '[name].uglify.map'
        },
        resolve: {
            extensions: ['.js', '.json']
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(true),
            new webpack.optimize.UglifyJsPlugin({
                mangle: {
                    screw_ie8: true,
                    except: ['$super', '$', '_']
                },

                beautify:  false,
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
            })
        ]
    };
};
