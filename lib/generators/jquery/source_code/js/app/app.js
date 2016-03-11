var $ = require('jquery');

var appTitleTpl = require('../../tmpl/app/appTitle.tpl');
var appListTpl = require('../../tmpl/app/appList.tpl');

var appList = require('../models/app/list');

var app = {};

app.setTitle = function(){
	$('.title').html(appTitleTpl({title: 'This is App Page.'}));
}

app.fetchList = function(){
	$('.list').html(appListTpl({list: appList}));

	$('.list li').on('mouseover', function(){
		$(this).find('i').addClass('active');
	});

	$('.list li').on('mouseout', function(){
		$(this).find('i').removeClass('active');
	});
}

module.exports = app;
