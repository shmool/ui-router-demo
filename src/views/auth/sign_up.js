export default class SignUpController {

  constructor ($state, UserService) {

    this.signUp = function () {
      if (this.password !== this.repeatPassword) {
        this.error = 'Passwords don\'t match';
        return;
      }
      UserService.signIn(this.username).then(function (result) {
        $state.go('store', {
          username: result.name,
          newUser: true
        });
      })
    };
  }

}

SignUpController.$inject = ['$state', 'UserService'];
