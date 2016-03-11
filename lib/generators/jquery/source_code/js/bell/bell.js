var $ = require('jquery');

var bellTitleTpl = require('../../tmpl/bell/bellTitle.tpl');
var bellListTpl = require('../../tmpl/bell/bellList.tpl');

var bellList = require('../models/bell/list');

var bell = {};

bell.setTitle = function(){
	$('.title').html(bellTitleTpl({title: 'This is Bell Page.'}));
}

bell.fetchList = function(){
	$('.list').html(bellListTpl({list: bellList}));

	$('.list li').on('mouseover', function(){
		$(this).find('i').addClass('active');
	});

	$('.list li').on('mouseout', function(){
		$(this).find('i').removeClass('active');
	});
}

module.exports = bell;
