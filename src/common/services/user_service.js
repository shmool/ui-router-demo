export class UserService {

  constructor($q) {

    this.user = {name: 'DevFest NL'};

    this.signIn = function (name) {
      this.user = {name: name}
      if (name === 'Admin') {
        console.log('adm')
        this.user.isAdmin = true;
      }
      return $q.when(this.user);
    };
  }


  signOut () {
    this.user.name = null;
  };

  getUser () {
    return this.user;
  }
}

UserService.$inject = ['$q'];