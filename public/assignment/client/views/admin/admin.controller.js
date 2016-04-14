"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($location, AdminService) {

        var vm = this;
        vm.createUser = createUser;
        function init() {
            vm.$location = $location;
            findAllUsers();
            }
            init();


        function findAllUsers() {
            AdminService.findAllUsersForAdmin().then(
                function (response) {
                    console.log(response.data);
                    vm.users = response.data;
                }, function (error) {
                    console.log(error);
                }
            );
        }


        vm.arrayToString = function(string){
            return string.join(",");
        };

        function createUser (user) {
            AdminService.createUser(user).then(
                function (response) {
                    console.log(response);
                    if(response) {
                        findAllUsers();
                        vm.user ={};
                    }
                }, function (error) {
                    console.log("error");
                }
            )

        }
    }


})();