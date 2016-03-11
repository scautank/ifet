require('../../sass/app/index.scss');

var app = require('./app');

var main = {

	init: function () {
		app.setTitle();
		app.fetchList();
	}

};

main.init();
