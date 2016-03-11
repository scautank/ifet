'use strict';

var karma = require('karma').Server;
var logger = require('../utils/logger');
var makeKarmaConfig = require('../config/makeKarmaConfig');

var fetTest = {};

fetTest.run = function(opts) {
	var karmaConfig = makeKarmaConfig(opts);
	var server = new karma(karmaConfig, function(exitCode) {
		process.exit(exitCode);
	});

	server.start();
};

module.exports = fetTest;