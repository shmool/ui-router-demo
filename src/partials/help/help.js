export default class HelpController {

  constructor (helpText, $state) {
    console.log($state)

    this.text = $state.current.data && $state.current.data.helpT || helpText;

  }

}

export default HelpController;