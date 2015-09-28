export default class BasicHeaderController {

  constructor ($state, UserService) {

    this.hello = function () {
      alert('hello!');
    };

    this.signIn = function () {
      $state.go('about');
      UserService.signIn('bla')
    };
  }

}

BasicHeaderController.$inject = ['$state', 'UserService'];