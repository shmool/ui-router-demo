export default class SignedInHeaderController {

  constructor ($state, UserService, username) {

    this.username = username;

    this.signOut = function () {
      $state.go('sign_in');
      UserService.signOut();
    };

  }

}

SignedInHeaderController.$inject=['$state', 'UserService', 'username'];