"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService) {

        $scope.user = $rootScope.user;
        $scope.$location = $location;

        if($rootScope.user === undefined) {
             $location.url("/")
        }

        $scope.update = update;

        function update(user) {

            UserService.updateUser(user._id, user, function(updatedUser) {
                $rootScope.user = updatedUser;
                console.log(updatedUser);
            });

        }
    }
})();