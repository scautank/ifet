'use strict';

var logger = require('./utils/logger');
var utils = require('./utils/');
var path = require('path');
var fs = require('fs');

/**
 * @func 
 * @desc 运行指令入口
 * @param {object} options - 参数对象
 */
var runner = function(options) {
    var files = path.join(__dirname, 'cmd', options.cmd + '.js');
    var opts = {};

    if (fs.existsSync(files)) {
        opts = cmdOption(options);

        if (opts.config !== false) {
            require(files).run(opts);
        }
    } else {
        logger.error('Commands error.');
    }
}

/**
 * @func
 * @desc 参数二次处理
 * @param {object} options - 参数对象
 * @return {object}
 */
function cmdOption(options) {
    var opts = utils.extend(options);

    if (['server', 'build', 'test'].indexOf(opts.cmd) > -1) {
        opts.config = getDefaultConfig();
    }

    return opts;
}

/**
 * @func
 * @desc 获取配置
 * @return {object|boolean}
 */
function getDefaultConfig() {
    var conf = {};
    var confPath = path.join(process.cwd(), 'ifet-conf.js');

    // 配置文件是否存在
    if (!fs.existsSync(confPath)) {
        logger.error('ifet-conf.js not found.');
        return false;
    }

    // 配置文件格式是否正确
    try {
        conf = JSON.parse(fs.readFileSync(confPath, 'utf-8'));
        return conf;
    } catch (e) {
        logger.error('config file format error.');
        return false;
    }
}

module.exports = runner;