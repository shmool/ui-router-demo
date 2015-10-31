export default class SignInController {

  constructor($state, UserService) {

    this.signIn = function () {
      UserService.signIn(this.username)
        .then(function (result) {
          $state.go('store', {
            username: result.name
          });
        })
    };
  }

}

SignInController.$inject = ['$state', 'UserService'];
