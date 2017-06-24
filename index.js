'use strict'

const path = require('path');
const fs   = require('fs');

const {
    RawSource,
    ConcatSource,
    SourceMapConsumer,
    SourceMapSource
} = require('webpack-sources');

const squash  = require('butternut').squash;
const async   = require("neo-async");
const temp    = require('temp').track();

const ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers');

class ButternutPlugin {
    constructor(options) {
        if (typeof options !== "object" || Array.isArray(options))
            options = {};

        this.options = options;

        if (typeof options.sourceMap === 'undefined') {
            options.sourceMap = false;
        }
        if (typeof options.includeContent === 'undefined') {
            options.includeContent = false;
        }
        if (typeof options.check === 'undefined') {
            options.check = true;
        }
        if (typeof options.allowDangerousEval === 'undefined') {
            options.allowDangerousEval = false;
        }
    }

    apply(compiler) {
        let code, inputMap, map, options = this.options;
        let tester = options.test = options.test || /\.js($|\?)/i;

        let queue = async.queue((task, callback) => {
            if (tester.test(task.file) === false) {
                return callback();
            }

            code = task.asset.source();

            try {
                let codeAndMap = squash(code, options);
                code = codeAndMap.code;
                map  = codeAndMap.map;

            } catch (err) {
                task.error(new Error(task.file + ' from ButternutPlugin\n' + err.message));
                return callback();
            }

            /*if (options.sourceMap) {
            } else {
                task.callback(new RawSource(code));
            }*/

            task.callback(new RawSource(code));

            callback();

        }, options.concurrency || 4);

        compiler.plugin('compilation', compilation => {
            compilation.plugin('normal-module-loader', context => {
                context.minimize = true;
            });

            compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
                let pending  = 0,
                    matching = 0;

                chunks.forEach(chunk => {
                    chunk.files.forEach(file => {
                        if (ModuleFilenameHelpers.matchObject(options, file)) {

                            matching++;
                            pending++;

                            queue.push({
                                file,
                                asset: compilation.assets[file],
                                callback: asset => {
                                    compilation.assets[file] = asset;
                                    if (--pending === 0) {
                                        callback();
                                    }
                                },
                                error: err => {
                                    console.error('Caught error: ', err);
                                    compilation.errors.push(err);
                                    if (--pending === 0) {
                                        callback();
                                    }
                                }
                            });
                        }
                    });
                });
                !matching && callback();
            });
        });
    }
};

module.exports = ButternutPlugin;
