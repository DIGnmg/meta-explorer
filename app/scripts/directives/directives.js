'use strict';

angular.module('metaexplorer.directives', [])

.directive('menuAnimation', function() {
  return {
	restrict: 'A',
	link: function ($scope, $element, $attr) {
		var trigger = $element.children( '.menu-trigger'),
		icon = $('span.icon-menu'),
		open = false;
		trigger.on('click', function(){
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
})

.directive('typeFlip', function() {
  return {
	restrict: 'A',
	link: function ($scope, $element, $attr) {
		$element.bind('click', function(){
			$scope.searchType = $attr.typeFlip;
			$('.active').removeClass('active');
			$element.addClass('active');
			$scope.$evalAsync();
		});

	}
  };
})

.directive({
	searchField: [
	'searchLocation', 'listService', 'getService','pagingService', '$compile',
		function (searchLocation, listService, getService, pagingService, $compile) {
			return {
				restrict: 'A',
				replace: false,
				require: '?ngModel',
				link: function (scope, element, attr, ctrl) {

					var menu = angular.element('<ul class="addressSearchInput hidden"><li data-index="{{$index}}" class="address-list" data-ng-class="{\'selected-address\': $index == activeIndex}" data-ng-repeat="address in myaddress">{{address.name}}{{address.username}}</li></ul>');
					var link = $compile(menu);
					var menuScope = scope.$new(true);
					link(menuScope);
					element.data('$isolateScope', menuScope);
					element.after(menu);

					menuScope.activeIndex = -1;
					var selected;
					var list =[];

					var keys = {
						TAB: 9,
						ENTER: 13,
						ESC: 27,
						UP: 38,
						DOWN: 40
					};
					var resetMenu = function () {
						menu.addClass("hidden");
						menuScope.activeIndex = -1;
					};

					var moveHighLightUp = function (){
						list = menuScope.myaddress;
						var selected = menuScope.activeIndex;
						while (selected > -1 && selected <= list.length) {
							menuScope.activeIndex -= 1;
							break;
						}
					};
					var moveHighLightDown = function (){
						list = menuScope.myaddress;
						var selected = menuScope.activeIndex;
						while (selected >= -1 && selected < list.length - 1) {
							menuScope.activeIndex += 1;
							break;
						}
					};
					var getId = function () {
						var radix;
						var ID = $(event.target).attr('data-index');
						var parsedIndex = parseInt(ID, radix);
						return parseInt(ID, radix);
					};
					var setInputWidth = function () {
						var inputWidth = element.css('width');
						menu.css('width', inputWidth);
					};

					var getSelectedItem = function (index) {
							resetMenu();
							scope.loading = true;
							var selectedAddress = menuScope.myaddress[index];
							if(selectedAddress){
									getService.get(scope.searchType ,selectedAddress.id).then(function(response){
										scope.paging = pagingService.set(scope.searchType, response.data.data[0].user.id, scope.search, response.data.pagination);
										scope.place = response.data.data;
										scope.loading = false;
									});
							}
							scope.$evalAsync();
					};

					menu.on('mousedown','li[data-index]', function (event){
						//user selected an item of the list
						element.focus();
						var parsedIndex = getId(event);
						getSelectedItem(parsedIndex);
					});

					menu.on('mouseenter','li[data-index]', function (event){
						//user selected an item of the list
						// element.addClass('hlight');
						var parsedIndex = getId(event);
						if(!Number.isNaN(parsedIndex)){
							menuScope.activeIndex = parsedIndex;
							scope.$evalAsync();
						}
					});

					element.on('keydown', function(event){
						if (event.keyCode === 38 || event.keyCode === 40) {
							event.preventDefault();
							if (event.keyCode === 38) {
								scope.$evalAsync(moveHighLightUp);
							} else if (event.keyCode === 40){
								scope.$evalAsync(moveHighLightDown);
							}
						} else if (event.keyCode === 13) {
							getSelectedItem(menuScope.activeIndex);
						} else if (event.keyCode === 27) {
							event.preventDefault();
							resetMenu();
						} else if (event.keyCode === 9) {
							getSelectedItem(menuScope.activeIndex);
						}

					});

					element.on('input', function () {
						var searched = element.val();
						scope.loading = true;
						listService.query(scope.searchType, searched).then(function(addressList){
							scope.loading = false;
							menuScope.myaddress = addressList.data.data;
							if (menuScope.myaddress.length > 0){
								setInputWidth();
								menu.removeClass("hidden");
							} else {
								resetMenu();
							}
						});
					});

					element.on('blur', function(event){
						resetMenu();
					});

					scope.$on('$destroy', function () {
						// make extra-certain the drop down is destroyed (placed in body)
						element.remove();
						resetMenu();
					});
				}
			};
		}
	]
});