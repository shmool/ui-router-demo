export default class basicFormController {

  constructor($state, $stateParams) {
    console.log('basicFormController')

    console.log($stateParams)
    this.submit = function () {
      alert(this.email)
    }
  }

}
