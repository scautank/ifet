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