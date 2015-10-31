export default class MessageController {

  constructor ($state, fakeData) {

    this.fakeData = fakeData.data;
    this.id = parseInt($state.params.messageId);
    this.title = 'Your Personal Message - version #' + this.id;

  }

  next () {
    return this.id + 1;
  }

  prev () {
    return this.id - 1;
  }

}

MessageController.$inject=['$state', 'fakeData'];