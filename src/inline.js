(function(){
  var module = angular.module('inline', []);

  module.directive('ngInline', [
    '$templateCache',
    function($templateCache) {
      return {
        restrict: 'A',
        priority: 400, // Same as ng-include.
        compile: function(element, attrs){
          var templateName = attrs.ngInline;
          var template = $templateCache.get(templateName);
          element.html(template);
        }
      };
    }
  ]);
})();
