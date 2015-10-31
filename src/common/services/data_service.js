export default class DataService {

  constructor ($http) {

    this.getData = ($stateParams) => {
      return $http({
        method: 'GET',
        url: 'https://api.github.com/users/mralexgray/repos',
        params: {
          page: $stateParams.messageId,
          per_page: 20
        }
      }).catch(function () {
        return {data: [
          {name: 'This is fake data'},
          {name: 'generated in the Data Service'},
          {name: 'because there was an error with the http request to Github.'},
          {name: 'The state param messageId is: ' + $stateParams.messageId},
        ]}
      });
    }

  }

}

DataService.$inject = ['$http'];
