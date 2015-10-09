import angular     from 'angular';
import uiRouter    from 'angular-ui-router';
import ngMessages  from 'angular-messages';
import appStyle    from 'app.less';
import sjTree   from 'common/directives/tree/tree.js';
import TabsController   from 'tabs/tabs-controller.js';
import basicForm   from 'basicForm/basicForm.js';
import HelpController from 'partials/help/help.js'
import SignInController from 'views/auth/sign_in.js'
import AboutController from 'views/about/about.js'
import CitiesController from 'views/cities/cities.js'
import StoreController from 'views/store/store.js'
import PictureFrameController from 'views/store/products/picture_frame.js'
import BasicHeaderController from 'partials/header/basic_header.js'
import SignedInHeaderController from 'partials/header/signed_in_header.js'
import { UserService } from 'common/services/user_service';
import DataService    from 'common/services/data_service.js';
import { registerStates, logErrors, routingRules } from 'routes.js'

export default angular.module('uiRouterDemo', [
  'ui.router',
  'sj.tree',
  basicForm.name,
  ngMessages
])
  .run(logErrors)
  .run(routingRules)
  .config(registerStates)
  .service('UserService', UserService)
  .service('DataService', DataService)
  .controller('tabsController', TabsController)
  .controller('basicForm', basicForm)
  .controller('HelpController', HelpController)
  .controller('SignInController', SignInController)
  .controller('AboutController', AboutController)
  .controller('CitiesController', CitiesController)
  .controller('StoreController', StoreController)
  .controller('PictureFrameController', PictureFrameController)
  .controller('BasicHeaderController', BasicHeaderController)
  .controller('SignedInHeaderController', SignedInHeaderController)


angular.bootstrap(document, ['uiRouterDemo']);
