"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($location, AdminService) {

        var vm = this;
        vm.createUser = createUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.resetForm = resetForm;
        vm.updateUser = updateUser;

        function init() {
            vm.$location = $location;
            vm.showPlus = true;
            vm.showCross = false;
            vm.showTick = false;
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

        function deleteUser(userId) {
            console.log(userId);
            AdminService.deleteUserByAdmin(userId).then(
                function (response) {
                    console.log(response);
                    if(response) {
                        vm.users = response.data;
                        vm.user ={};
                        vm.showPlus = true;
                        vm.showCross = false;
                        vm.showTick = false;
                    }
                }, function (error) {
                    console.log("error");
                }
            );
        }

        function createUser (user) {
            AdminService.createUser(user).then(
                function (response) {
                    console.log(response);
                    if(response.data) {
                        findAllUsers();
                        vm.user ={};
                        vm.showPlus = true;
                        vm.showCross = false;
                        vm.showTick = false;
                    }
                }, function (error) {
                    console.log(error);
                }
            );

        }

        function selectUser(index) {
            var selectedUser = angular.copy(vm.users[index]);
            vm.user = selectedUser;
            vm.showPlus = false;
            vm.showCross = true;
            vm.showTick = true;
        }

        function updateUser(userId,newUser) {
            console.log(userId,newUser);
            AdminService.updateUserByAdmin(userId,newUser).then(
                function (response) {
                    vm.users = response.data;
                    vm.user = {};
                    vm.showPlus = true;
                    vm.showCross = false;
                    vm.showTick = false;
                }, function (error) {

                }
            );

        }

        function resetForm() {

            vm.user = {};
            vm.showPlus = true;
            vm.showCross = false;
            vm.showTick = false;
        }
    }


})();