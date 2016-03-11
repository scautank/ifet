// reference from https://github.com/ant-design/antd-init

'use strict';

var logger = require('../utils/logger');
var vfs = require('vinyl-fs');
var fs = require('fs');
var through = require('through2');
var which = require('which');
var path = require('path');
var join = path.join;
var basename = path.basename;

var fetInit = {};

fetInit.run = function(opts) {
    var tmpl = opts.template || 'react';
    var cwd = join(__dirname, '../generators/' + tmpl);
    var dest = process.cwd();

    if (!tmpl || typeof tmpl !== 'string' || !fs.existsSync(cwd)) {
        logger.error('Can not find generator.');
        return;
    }

    vfs.src('**/*', {
            cwd: cwd,
            cwdbase: true,
            dot: true
        })
        .pipe(template(dest))
        .pipe(vfs.dest(dest))
        .on('end', function() {
            // fs.renameSync(path.join(dest,'gitignore'),path.join(dest,'.gitignore'));
            // npm安装依赖
            var npm = findNpm();

            runCmd(which.sync(npm), ['install'], function() {
                console.log(npm + ' install end');
            });
        })
        .resume();
};

function template(dest) {
    return through.obj(function(file, enc, cb) {
        if (!file.stat.isFile()) {
            return cb();
        }

        console.log('Write %s', simplifyFilename(join(dest, basename(file.path))));
        this.push(file);
        cb();
    });
}

function simplifyFilename(filename) {
    return filename.replace(process.cwd(), ".");
}

function runCmd(cmd, args, fn) {
    args = args || [];
    var runner = require('child_process').spawn(cmd, args, {
        // keep color
        stdio: "inherit"
    });

    runner.on('close', function(code) {
        if (fn) {
            fn(code);
        }
    });
}

function findNpm() {
    var npms = ['tnpm', 'cnpm', 'npm'];

    for (var i = 0; i < npms.length; i++) {
        try {
            which.sync(npms[i]);
            console.log('use npm: ' + npms[i]);
            return npms[i];
        } catch (e) {

        }
    }

    throw new Error('please install npm');
}

module.exports = fetInit;