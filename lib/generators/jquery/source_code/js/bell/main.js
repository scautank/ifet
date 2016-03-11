require('../../sass/bell/index.scss');

var bell = require('./bell');

var main = {

	init: function () {
		bell.setTitle();
		bell.fetchList();
	}

};

main.init();
