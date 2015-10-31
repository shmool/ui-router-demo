export default class UserService {

  constructor($q) {

    this.user = angular.fromJson(localStorage.user) || null;

    this.signIn = function (name) {
      this.user = { name: name };
      localStorage.user = angular.toJson(this.user);
      if (name === 'Admin') {
        this.user.isAdmin = true;
      }
      return $q.when(this.user);
    };
  }


  signOut () {
    this.user.name = localStorage.user = null;
  };

  getUser () {
    return this.user;
  }
}

UserService.$inject = ['$q'];