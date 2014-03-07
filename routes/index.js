/*
 * GET home page.
 */
var request = require('request');
var qs = require('querystring')
var app = require('../app');
var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;

exports.index = function(req, res){
  res.render('index.html', { title: 'Express AngularJS app' });
};

exports.SearchLocation = function(req, res, next) {
	var geo = req.params.geo,
 	clientId = "&distance=1000&client_id=6c915f96b07a44c381fb5c6bfe5e40ed";
  if (geo) {
	   var url = "https://api.instagram.com/v1/media/search?";
	   url + geo + clientId
	   console.log(url += geo += clientId);
		 var gram = request.get({url:url}, function (e, r, body) { console.log('location');})
     req.pipe(gram)
     gram.pipe(res)
	} else {
		 next();
	}

};

exports.SearchTags = function(req, res, next) {
	var search = req.query.term,
 	tokenid = "access_token="+req.session.passport.user.token;
 	if (search) {
		var url = "https://api.instagram.com/v1/tags/"+search+"/media/recent?";
	   			//https://api.instagram.com/v1/tags/snow/media/recent?access_token=ACCESS-TOKEN
		url + tokenid
		console.log(url += tokenid);
		var gram = request.get({url:url}, function (e, r, body) { console.log('tags');})
		req.pipe(gram)
		gram.pipe(res)
	} else {
		 next();
	}

};

exports.getUser = function(req, res, next) {
	var tokenid = "access_token="+req.session.passport.user.token,
 	userid = req.query.q;

 	if(!userid){
 		userid = req.session.passport.user.igId;
 	}

 	if (userid) {
		var url = "https://api.instagram.com/v1/users/"+userid+"/media/recent?";
	   			//https://api.instagram.com/v1/users/3/media/recent/?access_token=ACCESS-TOKEN
		url + tokenid
		console.log(url += tokenid);
		var gram = request.get({url:url}, function (e, r, body) { console.log('user id');})
		req.pipe(gram)
		gram.pipe(res)
	} else {
		 next();
	}

};

exports.findUserId = function(req, res, next) {
	console.log(req.query.q)
 	var search = req.query.q,
 	tokenid = "&access_token="+req.session.passport.user.token;

 	if (search) {
		var url = "https://api.instagram.com/v1/users/search?q="+search;
	   			//https://api.instagram.com/v1/users/search?q=jack&access_token=ACCESS-TOKEN
		url + tokenid
		console.log(url += tokenid);
		var gram = request.get({url:url}, function (e, r, body) { console.log('user images');})
		req.pipe(gram)
		gram.pipe(res)
	} else {
		 next();
	}

};

exports.testCall = function(req, res, next) {
	console.log(req.query);

	var search = req.query.search,
	view = req.query.view,
	type = req.query.type,
	tokenid = "&access_token="+req.session.passport.user.token,
	url;

	if (view == 'search'){
		url = "https://api.instagram.com/v1/"+type+"/"+view+"?q="+search;
			//https://api.instagram.com/v1/users/search?q=jack&access_token=ACCESS-TOKEN
		url + tokenid
		console.log(url += tokenid);
		var netflix = request.get({url:url}, function (e, r, body) { console.log('hello');})
		req.pipe(netflix)
		netflix.pipe(res)
	} else if (view == 'view') {
		url = "https://api.instagram.com/v1/"+type+"/"+search+"/media/recent?";
	   			//https://api.instagram.com/v1/users/3/media/recent/?access_token=ACCESS-TOKEN
		url + tokenid
		console.log(url += tokenid);
		var gram = request.get({url:url}, function (e, r, body) { console.log('hello');})
		req.pipe(gram)
		gram.pipe(res)
	} else {
		 next();
	}
};

exports.Paging = function(req, res, next) {
 	var search = req.query.q,
 	min_id = req.query.min,
 	max_id = req.query.max,
 	type = req.query.type,
 	tokenid = "&access_token="+req.session.passport.user.token;

 	if (search) {
		url = "https://api.instagram.com/v1/" + type + "/" + search +"/media/recent?" + "max_id=" + max_id;
		//https://api.instagram.com/v1/users/3/media/recent/?access_token=ACCESS-TOKEN
		url + tokenid
		console.log(url += tokenid);
		var gram = request.get({url:url}, function (e, r, body) { console.log('user images');})
		req.pipe(gram)
		gram.pipe(res)
	} else {
		 next();
	}

};

exports.LikeMedia = function(req, res, next){

	var mediaId = req.query.mediaId,
	tokenid = "?access_token="+req.session.passport.user.token;

	if(mediaId){
		url = "https://api.instagram.com/v1/media/"+mediaId+"/likes";
		//https://api.instagram.com/v1/media/670411170601024603_701747094/likes?access_token=4912390.1fb234f.85290656c8fd450fb7cd8f5f35740611
		url + tokenid
		console.log(url += tokenid);
		var gram = request.post({url:url}, function (e, r, body) { console.log('posting like');})
		req.pipe(gram)
		gram.pipe(res)
	}else{
		next();
	}

};

exports.UserLog = function(req, res){
	console.log(req.isAuthenticated())
	//if (req.isAuthenticated()) { return next(); }
	res.send({ user: req.isAuthenticated() });
};
