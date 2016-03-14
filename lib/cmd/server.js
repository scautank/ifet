'use strict';

var logger = require('../utils/logger');
var utils = require('../utils/');
var http = require('http');
var opn = require('opn');
var koa = require('koa');
var koaStatic = require('koa-static');
var webpack = require('webpack');
var makeWebpackConfig = require('../config/makeWebpackConfig').makeWebpackConfig;
var WebpackDevServer = require("webpack-dev-server");

var fetServer = {};

fetServer.run = function(opts) {
    var webpackDefaultConfig = makeWebpackConfig(opts);
    var devServerURL = utils.getIPv4()[0] || '127.0.0.1';

    if (!webpackDefaultConfig.entry) {
        logger.warn('Entry can not empty.');
        return;
    }

    var app = koa();
    var debug = opts.mode !== 'prod';
    var port = parseInt(opts.port);
    var proxyOptions = opts.proxy || {};
    var openURL = 'http://' + devServerURL + ':' + port;

    if (debug) {
        new WebpackDevServer(webpack(webpackDefaultConfig), {
            contentBase: webpackDefaultConfig.output.path,
            hot: false,
            historyApiFallback: false,
            proxy: proxyOptions,

            // webpack-dev-middleware options
            noInfo: false,
            quiet: false,
            lazy: false,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
            publicPath: webpackDefaultConfig.output.publicPath,
            headers: {
                "X-Custom-Header": "yes"
            },
            stats: {
                colors: true
            }

        }).listen(port, devServerURL, function() {
            console.log('development server listened on %s', port);
        });

    } else {
        app.use(koaStatic(webpackDefaultConfig.output.path, {
            maxage: 0
        }));

        http.createServer(app.callback()).listen(port, devServerURL, function() {
            console.log('production server listened on %s', port);
        });
    }

    // 用默认浏览器打开
    opn(openURL);
};

module.exports = fetServer;
