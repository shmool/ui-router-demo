export default class SignInController {

  constructor ($state, UserService) {
    this.hello = function () {
      alert('hello!');
    };

    this.signIn = function (username) {
      UserService.signIn(username).then(function (result) {
        $state.go('about', {id: '1', username: result.name});  // currently can't go to abstract state
      })
    };
  }

}

SignInController.$inject = ['$state', 'UserService'];
