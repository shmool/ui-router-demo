import angular     from 'angular';
import uiRouter    from 'angular-ui-router';

logErrors.$inject = ['$rootScope'];
routingRules.$inject = ['$rootScope', '$state', 'UserService'];
registerStates.$inject = ['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider'];

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

export function registerStates ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
  $urlMatcherFactoryProvider.type('pathParam', {
    encode: function (item) {
      return item;
    },
    decode: function (item) {
      return item;
    },
    is: function (item) {
      return true;
    }
  });

  $urlRouterProvider
    .otherwise('/about/1')
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
        },
        help: {}
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
    .state('auth_help', {
      parent: 'main',
      views: {
        'help@': {  // 'help' is not a view of the parent, so it must have absolute notation. can/should I use ^ ??
          templateUrl: 'partials/help/help.html',
          controller: 'HelpController',
          controllerAs: 'help',
          resolve: {
            helpText: function () {return 'Please sign in, my friend'}
          }
        }
      }
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
      params: {
        username: 'anonymous user'
      },
      resolve: {
        username: ['$stateParams', function ($stateParams) {
          return $stateParams.username;
        }]
      },
      data: {
        rule: function (user) {
          return user.name ? null : {toState: 'sign_in'};
        }
      },
      abstract: true
    })
    .state('about', {
      url: 'about/:aboutId',
      parent: 'signed_in',
      templateUrl: 'views/about/about.html',
      controller: 'AboutController as about',
      params: {
        aboutId: '1'
      },

      resolve: {
        fakeData: ['$http', '$stateParams', function ($http, $stateParams) {
          // this is bad practice, better have a service to perform the http request
          //return $http.get('https://api.github.com/users/mralexgray/repos?page='+ $stateParams.id + '&per_page=20');
          return {data: [{name: 'blabla'}]}
        }]
      }
    })
    .state('cities', {
      url: 'cities/{treePath:pathParam}',
      parent: 'signed_in',
      templateUrl: 'views/cities/cities.html',
      controller: 'CitiesController as cities'
    })
    .state('signed_in_help', {
      parent: 'signed_in',
      views: {
        'help@': {
          templateUrl: 'partials/help/help.html',
          controller: 'HelpController',
          controllerAs: 'help',
          resolve: {
            helpText: function () {return 'You are signed in, my friend'}
          }
        }
      }
    })
    .state('step_help', {
      parent: 'step',
      views: {
        'help@': {
          templateUrl: 'partials/help/help.html',
          controller: 'HelpController',
          controllerAs: 'help',
          resolve: {
            helpText: function ($stateParams) {return 'I\'ll help you with steps, my friend. Your\'re in step ' + $stateParams.step }
          }
        }
      },
      data: {
        helpT: 'helping u out'
      }
    })
    .state('session', {
      parent: 'signed_in',
      url: '/session/:sessionName',
      templateUrl: 'tabs/tabs.html',
      controller: 'tabsController',
      controllerAs: 'tabs',
      params: {
        sessionName: 'basicForm'
      },
      resolve: {
        sessionName: ($stateParams) => $stateParams.sessionName
      },
      abstract: true
    })
    .state('step', {
      url: '/:step',
      parent: 'session',
      templateUrl: ($stateParams) => $stateParams.sessionName + '/steps/step' + $stateParams.step + '.html',
      controllerProvider: ($stateParams) => $stateParams.sessionName + 'Controller',
      controllerAs: 'demo',
      params: {
        step: '0'
      }
    })

}

