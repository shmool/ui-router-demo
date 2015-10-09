export default class PictureFrameController {

  constructor($state) {

    this.stt = $state;
    this.params = $state.params;
    this.frameColor = $state.params.color;


  }
}

PictureFrameController.$inject = ['$state'];
