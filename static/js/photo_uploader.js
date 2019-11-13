angular.module('mod', ['angularFileUpload']);
 
        var x = ['$scope', '$upload', function ($scope, $upload) {
            $scope.selectFile = function ($slctfl) {
                    $upload.upload({
                        url: 'my/upload/url'
                    })
            }
        }];