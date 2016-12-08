// declare a module and load quillModule
var myAppModule = angular.module('quillTest', ['ngQuill', 'ngFileSaver']);
myAppModule.config(['ngQuillConfigProvider', function (ngQuillConfigProvider) {
    ngQuillConfigProvider.set();
}]);
myAppModule.controller('AppCtrl', [
    '$scope',
    '$timeout',
    'FileSaver', 'Blob',
    function($scope, $timeout, FileSaver, Blob) {
        $scope.title = 'Quill works';
        $scope.readOnly = false;
        $timeout(function () {
            $scope.title += ' awsome!!!'
        }, 2000);
        $scope.editorCreated = function (editor) {
            console.log(editor);
        };
        $scope.contentChanged = function (editor, html, text) {
            console.log('editor: ', editor, 'html: ', html, 'text:', text);
        };
        $scope.saveas = function() {
            var data = new Blob([$scope.title], { type: 'text/plain;charset=utf-8' });
            FileSaver.saveAs(data, 'text.html');
            //alert($scope.htmlContent);
        }
        $scope.displayFileContents = function(contents) {
            console.log("DDD");
            $scope.title = contents;
        };
    }
]);


myAppModule.directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            element.bind('change', function(e) {

                var onFileReadFn = $parse(attrs.onReadFile);
                var reader = new FileReader();

                reader.onload = function() {
                    var fileContents = reader.result;
                    // invoke parsed function on scope
                    // special syntax for passing in data
                    // to named parameters
                    // in the parsed function
                    // we are providing a value for the property 'contents'
                    // in the scope we pass in to the function
                    scope.$apply(function() {
                        onFileReadFn(scope, {
                            'contents' : fileContents
                        });
                    });
                };
                reader.readAsText(element[0].files[0]);
            });
        }
    };
})