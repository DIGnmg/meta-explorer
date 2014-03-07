'use strict';

angular.module('metaexplorer.directives', [])

.directive('lookUpService', ['$window', function($window) {
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
}])

.directive('menuAnimation', function() {
  return {
	restrict: 'A',
	link: function ($scope, $element, $attr, $window) {
		//$element.children( '.menu-trigger')
		var trigger = $element.children( '.menu-trigger'),
		icon = $('span.icon-menu'),
		open = false;
		trigger.on('click', function(){
			console.log("clicked");
			if( !open ) {
				$element.addClass('menu-open');
				open = true;
			} else {
				$element.removeClass('menu-open');
				open = false;
			}
		});
	}
  };
});




// var YTMenu = (function() {
//
// 	function init() {
//
// 		[].slice.call( document.querySelectorAll( '.dr-menu' ) ).forEach( function( el, i ) {
//
// 			var trigger = el.querySelector( 'div.dr-trigger' ),
// 				icon = trigger.querySelector( 'span.dr-icon-menu' ),
// 				open = false;
//
// 			trigger.addEventListener( 'click', function( event ) {
// 				if( !open ) {
// 					el.className += ' dr-menu-open';
// 					open = true;
// 				}
// 			}, false );
//
// 			icon.addEventListener( 'click', function( event ) {
// 				if( open ) {
// 					event.stopPropagation();
// 					open = false;
// 					el.className = el.className.replace(/\bdr-menu-open\b/,'');
// 					return false;
// 				}
// 			}, false );
//
// 		} );
//
// 	}
//
// 	init();
//
// })();
