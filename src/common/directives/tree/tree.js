export default angular.module('sj.tree', [])
  .directive('sjTree', sjTree)
  .directive('sjTreeCollection', sjTreeCollection)
  .directive('sjTreeMember', sjTreeMember)

function sjTree () {
  return {
    scope: {
      collection: '='
    },
    templateUrl: 'common/directives/tree/tree.html',
    controller: sjTreeController,
    controllerAs: 'tree',
    bindToController: true
  }
}

function sjTreeController ($state) {
  this.color = $state.params.color;

  this.showContent = (content) => {
    this.content = content;
  };

  this.setPath = (path) => {
    $state.go('.', {treePath: path}, {notify: false});
  };
}

sjTreeController.$inject = ['$state'];


function sjTreeCollection() {
  return {
    scope: {
      collection: '=',
      path: '='
    },
    template: '<ul><sj-tree-member ng-repeat="member in collection" member="member" path="path"></sj-tree-member></ul>'
  }
}


function sjTreeMember ($compile) {
  return {
    scope: {
      member: '=',
      path: '='
    },
    template: '<li ng-click="treeMember.toggleNodeOpen()">{{treeMember.member.title}}</li>',

    require: '^sjTree',
    controller: sjTreeMemberController,
    controllerAs: 'treeMember',
    bindToController: true,

    link: function (scope, element, attrs, ctrls) {
      if (angular.isArray(scope.treeMember.member.nodes)) {
        $compile(
          '<sj-tree-collection ng-show="treeMember.nodeOpen" collection="treeMember.member.nodes" path="treeMember.path">' +
          '</sj-tree-collection>'
        )(scope, function (cloned, scope) {
          element.append(cloned);
        });
      }

      scope.showContent = ctrls.showContent;
      scope.setPath = ctrls.setPath;
      scope.treeMember.setPath();
    }
  }
}

sjTreeMember.$inject = ['$compile'];


function sjTreeMemberController ($stateParams, $scope) {
  this.path = (this.path ? this.path : '')  + '/' + this.member.title;

  if ($stateParams.treePath && $stateParams.treePath.indexOf(this.path) === 0) {
    this.nodeOpen = true;
  }

  this.setPath = () => {
    if ($stateParams.treePath && $stateParams.treePath.indexOf(this.path) === 0) {
      $scope.showContent(this.member)
    }
  };

  this.toggleNodeOpen = () => {
    this.nodeOpen = !this.nodeOpen;
    if (!this.member.nodes) {
      $scope.showContent(this.member);
      $scope.setPath(this.path);
    }
  }
}

sjTreeMemberController.$inject = ['$stateParams', '$scope'];
