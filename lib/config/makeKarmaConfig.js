'use strict';

var path = require('path');
var join = path.join;
var getDefaultWebpackConfig = require('./makeWebpackConfig').getDefaultWebpackConfig;

var makeKarmaConfig = function makeKarmaConfig(conf) {
    var cwd = process.cwd();

    var config = {
        basePath: join(cwd, conf.config.testDir || 'tests'),
        frameworks: ['jasmine'],
        files: ['**/*.js'],
        exclude: ['karma.conf.js'],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        autoWatch: true,
        browsers: ['Chrome'],
        captureTimeout: 60000,
        singleRun: false,
        preprocessors: {
            '**/*.js': ['webpack']
        },
        coverageReporter: {
            type: 'html',
            dir: join(cwd, '__coverage')
        },
        webpack: {},
        webpackMiddleware: {
            noInfo: true
        },
        plugins: [
            require("karma-webpack"),
            require('karma-jasmine'),
            require('karma-chrome-launcher')
        ]
    };

    config.webpack = getDefaultWebpackConfig();

    if (conf.cov) {
        config.reporters.push('coverage');
        config.preprocessors = {
            '**/*.js': ['webpack', 'coverage']
        };
        config.plugins.push(require('karma-coverage'));
    }

    return config;
};

module.exports = makeKarmaConfig;