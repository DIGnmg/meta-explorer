'use strict';

angular.module('metaexplorer.directives', [])

.directive('animateScroll', function($window) {
  return {
	restrict: 'A',
	link: function ($scope, $element, $attr, $window) {
	// 	function check () {
	//
	// 		if($element.offset().top > ($(window).scrollTop() + $(window).height() - 20)){
	// 			console.log("hit borrom");
	// 		}
	// 		requestAnimationFrame(check);
	// 	}
	// 	window.requestAnimationFrame(check);
	}
  };
})

.directive('lookUpService', function($window) {
  return {
	restrict: 'A',
	link: function ($scope, $element, $attr, $window) {
	// 	function check () {
	//
	// 		if($element.offset().top > ($(window).scrollTop() + $(window).height() - 20)){
	// 			console.log("hit borrom");
	// 		}
	// 		requestAnimationFrame(check);
	// 	}
	// 	window.requestAnimationFrame(check);
	}
  };
});
