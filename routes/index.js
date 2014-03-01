/*
 * GET home page.
 */
var request = require('request');
var qs = require('querystring')
var app = require('../app');

exports.index = function(req, res){
  res.render('index.html', { title: 'Express AngularJS app' });
};

exports.findAll = function(req, res) {
	var movie = "Tintin";

	var url = "http://api-public.netflix.com/catalog/titles/autocomplete?v=2.0&output=json&oauth_consumer_key=dqhgmbsxbkhhatpzakb2ea2v&";
	var params = 'term='+ movie;
	url + params
	console.log(url += params);
	//var netflix = request(url)
	var netflix = request.get({url:url}, function (e, r, body) { console.log('hello');})
	req.pipe(netflix)
	netflix.pipe(res)
};
exports.instant = function(req, res, next) {
	var search = req.params.search;
	console.log(search);
	if (search) {
		var url = "http://api-public.netflix.com/catalog/titles?v=2.0&output=json&term=";
		var params = 'Tintin';
		url + search
		console.log(url += search);
		oauth = { consumer_key: "dqhgmbsxbkhhatpzakb2ea2v", consumer_secret: "4Ja6UbQAQq"};
		var netflix = request.get({url:url, oauth:oauth, json:true}, function (e, r, body) {
			//console.log(body)
		})
		req.pipe(netflix)
		netflix.pipe(res)
	} else {
		next();
	}
};