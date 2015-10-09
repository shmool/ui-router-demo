import cities from './cities.json';
export default class CitiesController {

  constructor ($state) {

    this.treeData = cities;
  }


}

CitiesController.$inject = ['$stateParams'];