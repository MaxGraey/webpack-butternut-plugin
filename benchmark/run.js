'use strict'

const webpack = require("webpack");
const async   = require("neo-async");
const now     = require("performance-now");

const butternutConfig = require('./webpack.butternut.config');
const uglifyConfig    = require('./webpack.uglify.config');
const closureConfig   = require('./webpack.closure.config');


function run(name, compiler, done) {
    let buildStart;
    compiler.plugin("compilation", compilation => {
        compilation.plugin('optimize', () => buildStart = now());
        compilation.plugin('after-optimize-chunk-assets', () => {
            let time = now() - buildStart;
            console.log(name + ' bundled in ' + time.toFixed(3) + ' ms');
            done();
        });
    });
    compiler.run((err, stats) => {
        if (err)
            return console.error(err);

        if (stats.hasErrors())
            return console.error(stats.toString('errors-only'));

        var info   = stats.toJson({ performance: true });
        var assets = info.assets;

        for (let asset of assets) {
            console.log(' • asset:', asset.name, '(' + Math.floor(asset.size / 1000) + ' kB)');
        }
    });
}


async.series([
    callback => run('Uglify2',   webpack(uglifyConfig(5)),    callback),
    callback => run('Closure',   webpack(closureConfig(5)),   callback),
    callback => run('Butternut', webpack(butternutConfig(5)), callback)
], (err, results) => {
    if (err) throw err;
    console.log('done!');
});
