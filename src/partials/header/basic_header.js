export default class BasicHeaderController {

  constructor ($state, UserService) {

    this.hello = function () {
      alert('hello!');
    };

    this.signIn = function (username) {
      UserService.signIn(username).then(function (result) {
        $state.go('store', {id: '1', username: result.name});
      })
    };
  }

}

BasicHeaderController.$inject = ['$state', 'UserService'];