import angular     from 'angular';
import uiRouter    from 'angular-ui-router';

logErrors.$inject = ['$rootScope'];
routingRules.$inject = ['$rootScope', '$state', 'UserService'];
registerStates.$inject = ['$stateProvider', '$urlRouterProvider'];

export function logErrors ($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
}

export function routingRules ($rootScope, $state, UserService) {

  $rootScope.$on('$stateChangeStart', function (event, toState) {

    if (!toState.data || !angular.isFunction(toState.data.rule)) return;

    var result = toState.data.rule(UserService.getUser());

    if (result && result.toState) {
      event.preventDefault();
      $state.go(result.toState, result.params, {location: 'replace'});
    }
  });
}

export function registerStates ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider
    .otherwise('/store')
    .when('/home', '/home/index');

  $stateProvider
    .state('main', {
      url: '/',
      views: {
        header: {
          templateUrl: 'partials/header/basic_header.html',
          controller: 'BasicHeaderController',
          controllerAs: 'header'
        },
        content: {
          templateUrl: 'views/auth/auth.html'
        }
      },
      abstract: true
    })
    .state('sign_in', {
      url: 'signin',
      parent: 'main',
      controller: 'SignInController as signin',
      templateUrl: 'views/auth/sign_in.html'
    })
    .state('sign_up', {
      url: 'signup',
      parent: 'main',
      templateUrl: 'views/auth/sign_up.html'
    })
    .state('signed_in', {
      url: '/',
      views: {
        header: {
          templateUrl: 'partials/header/signed_in_header.html',
          controller: 'SignedInHeaderController',
          controllerAs: 'header'
        },
        content: {
          template: '<ui-view autoscroll></ui-view>'
        }
      },
      resolve: {
        username: ['UserService', function (UserService) {
          return UserService.user.name;
        }]
      },
      data: {
        rule: function (user) {
          return user && user.name ? null : {toState: 'sign_in'};
        }
      },
      abstract: true
    })
    .state('admin', {
      parent: 'signed_in',
      url: 'admin',
      template: '<h1>Hello Admin!</h1>',
      data: {
        rule: function (user) {
          return user && user.isAdmin ? null : {toState: 'store'};
        }
      }
    })
    .state('store', {
      url: 'store?color',
      parent: 'signed_in',
      views: {
        'content@': {
          templateUrl: 'views/store/store.html',
          controller: 'StoreController as store'
        }
      }
    })
    .state('cities', {
      url: '/cities{treePath:any}',
      parent: 'store',
      templateUrl: 'views/cities/cities.html',
      controller: 'CitiesController as cities'
    })
    .state('picture_frame', {
      url: '/picture-frame',
      parent: 'store',
      templateUrl: 'views/store/products/picture_frame.html',
      controller: 'PictureFrameController as pictureFrame'
    })
    .state('about', {
      url: '/message/:aboutId',
      parent: 'store',
      templateUrl: 'views/about/about.html',
      controller: 'AboutController as about',
      params: {
        aboutId: '1'
      },
      resolve: {
        fakeData: ['DataService', '$stateParams', function (DataService, $stateParams) {
          return DataService.getData($stateParams);
        }]
      }
    })

}

