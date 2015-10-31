import angular     from 'angular';
import uiRouter    from 'angular-ui-router';
import appStyle    from 'app.less';

import UserService from 'common/services/user_service';
import DataService from 'common/services/data_service.js';
import sjTree      from 'common/directives/tree/tree.js'

import { registerStates, logErrors, routingRules } from 'routes.js'
import { registerAuthStates } from 'views/auth/routes.js'

export default angular.module('uiRouterDemo', [
  'ui.router',
  'sj.tree'
])
  .run(logErrors)
  .run(routingRules)
  .config(registerStates)
  .config(registerAuthStates)

  .service('UserService', UserService)
  .service('DataService', DataService)


angular.bootstrap(document, ['uiRouterDemo']);
