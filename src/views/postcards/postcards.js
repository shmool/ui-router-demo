import postcards from './postcards.json';
export default class PostcardsController {

  constructor ($state) {

    this.treeData = postcards;
  }


}

PostcardsController.$inject = ['$stateParams'];