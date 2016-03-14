var os = require('os');

/**
 * @func
 * @desc 对象扩展
 * @param {object} parent
 * @param {object} [child]
 * @return {object}
 */
exports.extend = function(parent, child) {
	child = child || {};
	for (var i in parent) {
		if (parent.hasOwnProperty(i) && !child.hasOwnProperty(i)) {
			child[i] = parent[i];
		}
	}
	return child;
};

/**
 * @func
 * @desc 获取IP地址
 * @return {array}
 */
exports.getIPv4 = function () {
    var networkInterfaces = os.networkInterfaces();
    var foundIPv4s = [];

    var checkIP = function (addressInfo) {
        if (addressInfo.internal === false && addressInfo.family === 'IPv4') {
            foundIPv4s.push(addressInfo.address);
        }

    };

    for (var network in networkInterfaces) {
        if (networkInterfaces.hasOwnProperty(network)) {
            var networkInfo = networkInterfaces[network];
            networkInfo.forEach(checkIP);
        }

    }

    if (!foundIPv4s.length) {
        foundIPv4s.push('127.0.0.1');
    }

    return foundIPv4s;
};
