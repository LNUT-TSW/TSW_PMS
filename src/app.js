angular.module('app', ['ui.router', 'oc.lazyLoad','ui.bootstrap'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.when("", "/pmsHome");
	$stateProvider.state('pmsHome', {
		url: '/pmsHome',
		controller: 'pmsHomeCtrl',
		templateUrl: 'pmsHome/pmsHome.tpl.html',
		resolve: {
			load: ['$ocLazyLoad', function($ocLazyLoad){
				return $ocLazyLoad.load([
					'pmsHome/pmsHomeCtrl.js'
					]);
			}]
		}
	})
	.state('pmsHome.page1', {
		url: '/page1',
		templateUrl: 'pmsHome/tpls/main.tpl.html'
	})
	.state('pmsHome.page2', {
		url: '/page2',
		templateUrl: 'pmsHome/tpls/main2.tpl.html'
	})
}])

angular.element(document).ready(function() {
	angular.bootstrap(document, ["app"]);
});