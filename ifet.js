'use strict';

var logger = require('./lib/utils/logger');
var commander = require('commander');
var runner = require('./lib/runner');
var fetool = {};

fetool.name = 'ifet';

/**
 * @desc 入口
 * @param {object} argv - process.argv
 */
fetool.run = function(argv) {
    commander.usage('[command] <options ...>');
    commander.option('-v, --version', 'output the version number', function() {
        displayVersion();
    });

    // ifet init -t react/jquery
    commander
        .command('init')
        .description('init a project')
        .option('-t, --template <str>', 'project template')
        .action(function(options) {
            runner({
                cmd: 'init',
                template: options.template
            });
        });

    // ifet server -p 3001 -m dev/prod
    commander
        .command('server')
        .description('start debug server')
        .option('-p, --port <str>', 'server listen port')
        .option('-m, --mode <str>', 'server mode, dev/prod')
        .action(function(options) {
            runner({
                cmd: 'server',
                port: parseInt(options.port) || 3001,
                mode: options.mode || 'dev'
            });
        });

    // ifet build --debug/--watch
    commander
        .command('build')
        .description('build project')
        .option('--debug', 'create source map files')
        .option('--watch', 'watch files change')
        .action(function(options) {
            runner({
                cmd: 'build',
                debug: !!options.debug,
                watch: !!options.watch
            });
        });

    // ifet test --no-cov
    commander
        .command('test')
        .description('run unit test')
        .option('--no-cov', 'not create coverage')
        .action(function(options) {
            runner({
                cmd: 'test',
                cov: options.cov
            });
        });

    commander.parse(argv);
};

/**
 * @func
 * @desc 打印版本号
 */
function displayVersion() {
    var pkg = require('./package.json');
    var version = pkg.version || '0.1.0';

    logger.info(fetool.name + ': ' + version);
}

module.exports = fetool;