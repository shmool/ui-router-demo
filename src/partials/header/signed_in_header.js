export default class SignedInHeaderController {

  constructor ($state, UserService, $stateParams) {

    this.stt = $state
    this.p = $stateParams

    this.username = $state.params.username;

    this.hello = function () {
      alert('hello friend!');
    };

    this.signOut = function () {
      $state.go('sign_in');
      UserService.signOut();
    };

    this.help = function () {
      $state.go($state.current.name + '_help')
    }
  }

}

SignedInHeaderController.$inject=['$state', 'UserService', '$stateParams'];