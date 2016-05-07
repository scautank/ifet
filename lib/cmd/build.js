'use strict';

var logger = require('../utils/logger');
var path = require('path');
var rimraf = require('rimraf');
var vfs = require('vinyl-fs');
var webpack = require('webpack');
var makeWebpackConfig = require('../config/makeWebpackConfig').makeWebpackConfig;

var fetBuild = {};

fetBuild.run = function(opts) {
    // 获取默认webpack配置
    var webpackDefaultConfig = makeWebpackConfig(opts);
    //
    fetBuild.webpackConfig = webpackDefaultConfig;
    fetBuild.toolConfig = opts.config;

    if (!webpackDefaultConfig.entry) {
        logger.warn('Entry can not empty.');
        return;
    }

    // 清空输出目录
    rimraf.sync(webpackDefaultConfig.output.path);
    // console.log(webpackDefaultConfig);
    var compiler = webpack(webpackDefaultConfig);

    if (opts.watch) {
        compiler.watch({
            aggregateTimeout: 300,
            poll: true
        }, doneHandler);
    } else {
        compiler.run(doneHandler);
    }
};

function doneHandler(err, stats) {
    var errors = stats.toJson().errors;
    if (errors && errors.length) {
        process.on('exit', function() {
            process.exit(1);
        });
    }

    console.log(stats.toString({
        colors: true
    }));

    if (err) {
        process.on('exit', function() {
            process.exit(1);
        });
        console.error(err);
    }
    // 复制文件
    copyFiles(fetBuild.toolConfig.copy);
}

function copyFiles(files) {
    if (files.length === 0) return;

    var arrFile = files.map(function(item, i) {
        return path.join(process.cwd(), item);
    });
    
    vfs.src(arrFile).pipe(vfs.dest(fetBuild.webpackConfig.output.path));
}

module.exports = fetBuild;