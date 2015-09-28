LoremService.$inject = ['$http'];

export class LoremService {

  getLorem (params) {

    return $http.get('http://loripsum.net/api/')
    .then(function (result) {
        this.fakeData = result.data;
        return result;
      })
  }

}

