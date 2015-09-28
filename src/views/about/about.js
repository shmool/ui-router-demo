export default class AboutController {

  constructor ($state, fakeData) {

    this.stt = $state
    this.fakeData = fakeData.data;
    this.id = parseInt($state.params.aboutId);
    this.title = 'About ' + this.id;

  }

  next () {
    return this.id + 1;
  }

  prev () {
    return this.id - 1;
  }

}

AboutController.$inject=['$state', 'fakeData'];