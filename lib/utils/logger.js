'use strict';

var colors = require('colors');

var logger = {
	info: function (msg) {
		console.log(msg.green);
	},
	warn: function (msg) {
		console.log(msg.yellow);
	},
	error: function (msg) {
		console.log(msg.red);
	}
}

module.exports = logger;
