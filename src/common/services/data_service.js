export default class DataService {

  constructor ($http) {

    this.getData = ($stateParams) => {
      return $http({
        method: 'GET',
        url: 'https://api.github.com/users/mralexgray/repos',
        params: {
          page: $stateParams.aboutId,
          per_page: 20
        }
      }).catch(function () {
        return {data: [
          {name: 'This is fake data'},
          {name: 'Generated in the Data Service'},
          {name: 'Because there was an error with the http request to Github'},
          {name: 'The state param aboutId is: ' + $stateParams.aboutId},
        ]}
      });
    }

  }

}

DataService.$inject = ['$http'];
