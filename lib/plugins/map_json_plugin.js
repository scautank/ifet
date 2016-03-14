'use strict';

var path = require('path');
var fs = require('fs');
var extType = ['.js', '.css'];

function MapJsonPlugin(options) {
	// TODO：参数配置
	this.options = options;
}

var proto = MapJsonPlugin.prototype;

proto.apply = function(compiler) {
	compiler.plugin('done', function(stats) {
		var defaultOutputPath = path.join(compiler.outputPath, 'map_default.json');
		var newOutputPath = path.join(compiler.outputPath, 'map.json');
		var statsJson = stats.toJson();
		var assets = statsJson.assets;
		var map = {};

		assets.forEach(function(item, index) {
			var name = item.name;
			var ext = path.extname(name);
			var dirname = path.dirname(name);
			var chunkName = [dirname, item.chunkNames[0] + ext].join('/');

			if (extType.indexOf(ext) === -1) {
				return;
			}

			map[chunkName] = name;
		});

		fs.writeFileSync(defaultOutputPath, JSON.stringify(statsJson, null, 4));
		fs.writeFileSync(newOutputPath, JSON.stringify(map, null, 4));
	});
};

module.exports = MapJsonPlugin;