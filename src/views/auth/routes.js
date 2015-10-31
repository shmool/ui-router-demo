import angular     from 'angular';
import uiRouter    from 'angular-ui-router';

import SignInController from 'views/auth/sign_in.js'
import SignUpController from 'views/auth/sign_up.js'

registerAuthStates.$inject = ['$stateProvider'];

export function registerAuthStates ($stateProvider) {

  $stateProvider
    .state('sign_in', {
      url: 'signin',
      parent: 'main',
      templateUrl: 'views/auth/sign_in.html',
      controller: SignInController,
      controllerAs: 'signin'
    })
    .state('sign_up', {
      url: 'signup',
      parent: 'main',
      templateUrl: 'views/auth/sign_up.html',
      controller: SignUpController,
      controllerAs: 'signup'
    })
}


