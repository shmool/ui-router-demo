export default class SignInController {

  constructor ($state, UserService) {
    this.hello = function () {
      alert('hello!');
    };

    this.signIn = function (username) {
      UserService.signIn(username).then(function (result) {
        $state.go('store', {username: result.name});
      })
    };
  }

}

function signInCtrl($state) {
  this.signin = function () {
    $state.go
  }
}

SignInController.$inject = ['$state', 'UserService'];
