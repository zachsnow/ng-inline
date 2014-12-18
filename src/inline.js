(function(){
  var module = angular.module('inline', []);

  module.directive('ngInline', [
    '$templateCache',
    function($templateCache, $compile, $http, $q) {
      var utils    = {};
      /**
       * Load an external file through $http.
       * @param  {String} templateId [Template name, or file path]
       * @return {Promise}           [Return a promise]
       */
      utils.superCache = function (templateId) {
        var fn = {}, deferred;

        // Save & pass the loaded template
        fn.success = function (data) {
          console.info('loaded and cached:', templateId);
          // Save template in cache
          $templateCache.put(templateId, data);
          // Return the template.
          deferred.resolve(data);
        };
        // Pass an error message
        fn.failed = function (message) {
          deferred.reject('cache failed:', message);
        };


        deferred = $q.defer();

        $http.get(templateId).success(fn.success).error(fn.failed);
        return deferred.promise;
      };

      return {
        restrict: 'A',
        priority: 400, // Same as ng-include.
        compile: function(element, attrs) {
          var templateName,
            template;

          templateName = attrs.ngInline;

          if(!templateName){
            throw new Error('ngInline: expected template name');
          }

          template = $templateCache.get(templateName);
          if(angular.isUndefined(template)){
            return function(scope, element){

              utils.superCache(templateName).then(function(tpl) {

                element.html(tpl);
                $compile(element.contents())(scope);

              }, console.log );
            };
          } else {
            element.html(template);
          }
        }
      };
    });
})();
