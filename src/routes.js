import angular     from 'angular';
import uiRouter    from 'angular-ui-router';

import HelpController from 'partials/help/help.js'
import MessageController from 'views/message/message.js'
import PostcardsController from 'views/postcards/postcards.js'
import StoreController from 'views/store/store.js'
import PictureFrameController from 'views/store/products/picture_frame.js'
import BasicHeaderController from 'partials/header/basic_header.js'
import SignedInHeaderController from 'partials/header/signed_in_header.js'

logErrors.$inject = ['$rootScope'];
routingRules.$inject = ['$rootScope', '$state', 'UserService'];
registerStates.$inject = ['$stateProvider', '$urlRouterProvider'];

export function logErrors ($rootScope) {
  $rootScope.$on('$stateChangeError', console.log.bind(console));
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
    .otherwise('/signin');

  $stateProvider
    .state('main', {
      url: '/',
      views: {
        header: {
          templateUrl: 'partials/header/basic_header.html',
          controller: BasicHeaderController,
          controllerAs: 'header'
        },
        content: {
          templateUrl: 'views/auth/auth.html'
        }
      },
      abstract: true
    })

    .state('signed_in', {
      url: '/',
      views: {
        header: {
          templateUrl: 'partials/header/signed_in_header.html',
          controller: SignedInHeaderController,
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

    .state('store', {
      url: 'store?color',
      parent: 'signed_in',
      views: {
        'content@': {
          templateUrl: 'views/store/store.html',
          controller: StoreController,
          controllerAs: 'store'
        }
      }
    })

    .state('message', {
      url: '/message/:messageId',
      parent: 'store',
      templateUrl: 'views/message/message.html',
      controller: MessageController,
      controllerAs: 'message',
      params: {
        messageId: '1'
      },
      resolve: {
        fakeData: ['DataService', '$stateParams', function (DataService, $stateParams) {
          return DataService.getData($stateParams);
        }]
      }
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

    .state('postcards', {
      url: '/postcards{treePath:any}',
      parent: 'store',
      templateUrl: 'views/postcards/postcards.html',
      controller: PostcardsController,
      controllerAs: 'postcards'
    })

    .state('picture_frame', {
      url: '/picture-frame',
      parent: 'store',
      templateUrl: 'views/store/products/picture_frame.html',
      controller: PictureFrameController,
      controllerAs: 'pictureFrame'
    })

}

