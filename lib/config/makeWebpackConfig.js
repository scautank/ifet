'use strict';

var logger = require('../utils/logger');
var path = require("path");
var join = path.join;
var webpack = require('webpack');
var fs = require('fs');
var utils = require('../utils/');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
var MapJsonPlugin = require('../plugins/map_json_plugin');

// 默认webpack配置
var getDefaultWebpackConfig = function getDefaultWebpackConfig(imageLimit) {
    var config = {
        resolve: {
            root: join(__dirname, '../../node_modules'),
            extensions: ['', '.js', '.jsx']
        },
        resolveLoader: {
            root: join(__dirname, '../../node_modules')
        },
        module: {
            loaders: [{
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: [
                        require.resolve('babel-preset-es2015'),
                        require.resolve('babel-preset-react'),
                        require.resolve('babel-preset-stage-0')
                    ]
                }
            }, {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract('style', 'css?minimize')
            }, {
                test: /\.scss$/,
                loader: ExtractTextWebpackPlugin.extract('style', 'css!autoprefixer!sass')
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'url?limit=' + (imageLimit || 2) + '&name=images/[name]_[hash:8].[ext]',
                    'image-webpack?{bypassOnDebug: true, progressive:true, optimizationLevel: 3, pngquant:{quality: "65-80"}}'
                ]
            }, {
                test: /\.(woff|eot|ttf)$/i,
                loader: 'url?limit=10000&name=fonts/[name].[ext]'
            }, {
                test: /\.tpl$/,
                loader: 'tmodjs'
            }]
        }
    }

    return config;
}

var makeWebpackConfig = function makeWebpackConfig(opts) {
    // 定义命名
    var jsFileName = 'js/[name]-[chunkhash:8].js';
    var cssFileName = 'css/[name]-[chunkhash:8].css';
    var commonName = 'js/common-[chunkhash:8].js';
    var cwd = process.cwd();
    var conf = opts.config;
    var confOutput = conf.output;
    var outputPath = confOutput ? join(cwd, confOutput) : join(cwd, 'build_code');
    // 获取默认配置
    var config = getDefaultWebpackConfig(conf.imageLimit);
    var confEntry = conf.entry;
    var devServerURL = utils.getIPv4()[0] || '127.0.0.1';

    // 自动刷新的配置，只有server命令不为prod模式才生效
    if (opts.cmd === 'server' && opts.mode !== 'prod') {
        for (var entry in confEntry) {
            var curEntry = confEntry[entry];
            confEntry[entry] = [
                'webpack-dev-server/client?http://' + devServerURL + ':' + opts.port,
                curEntry
            ];
        }
    }

    config.entry = confEntry;
    config.output = {
        path: outputPath,
        filename: jsFileName,
        chunkFilename: jsFileName,
        publicPath: conf.publicPath || ''
    };

    config.devtool = opts.debug ? 'eval-source-map' : '';
    config.externals = {};
    config.plugins = [];

    // 单独处理html
    var htmlOpts = conf.html;
    var arrHtmlPlugin = [];
    var htmlName, curOpts, curExt;

    for (htmlName in htmlOpts) {
        curOpts = htmlOpts[htmlName];
        curExt = curOpts.match(/\w+$/)[0] || 'html';

        arrHtmlPlugin.push(
            new HtmlWebpackPlugin({
                template: htmlOpts[htmlName],
                filename: htmlName + '.' + curExt,
                inject: 'body',
                chunks: ['common', htmlName]
            })
        );
    }

    var otherPlugin = [
        new CommonsChunkPlugin('common', commonName),
        new ExtractTextWebpackPlugin(cssFileName, {
            allChunks: false
        }),
        new OccurenceOrderPlugin()
    ];

    // uglify,noError,maps.json - ifet build
    if (opts.cmd === 'build' && !opts.debug) {
        otherPlugin.push(
            new UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.NoErrorsPlugin(),
            new MapJsonPlugin()
        );
    }

    config.plugins = config.plugins.concat(arrHtmlPlugin, otherPlugin);
    return config;
}

module.exports = {
    getDefaultWebpackConfig: getDefaultWebpackConfig,
    makeWebpackConfig: makeWebpackConfig
};
