export default class PictureFrameController {

  constructor($state) {

    this.params = $state.params;

  }
}

PictureFrameController.$inject = ['$state'];
