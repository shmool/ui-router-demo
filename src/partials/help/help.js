export default class HelpController {

  constructor (helpText, $state) {
    this.text = $state.current.data && $state.current.data.helpText || helpText;

  }

}

export default HelpController;