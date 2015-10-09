export default class StoreController {

  constructor ($state) {

    this.color = $state.params.color;

    this.updateColor = () => {
      $state.params.color = this.color;
    };

    this.saveColor = () =>
    $state.go('.', $state.params, {reload: true, notify: true});
  }

}

StoreController.$inject = ['$state'];
