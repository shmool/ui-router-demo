export default class AboutController {

  constructor ($state, fakeData) {

    this.fakeData = fakeData.data;
    this.id = parseInt($state.params.aboutId);
    this.title = 'Your Personal Message - version ' + this.id;

  }

  next () {
    return this.id + 1;
  }

  prev () {
    return this.id - 1;
  }

}

AboutController.$inject=['$state', 'fakeData'];