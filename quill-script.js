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
            FileSaver.saveAs(data, 'text.txt');
            //alert($scope.htmlContent);
        }
    }
]);
