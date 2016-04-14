"use strict";
(function(){

    angular
        .module("FormBuilderApp")
        .factory("AdminService", AdminService);

    function AdminService ($http, $rootScope) {

        var api = {
            createUser:createUser,
            findAllUsersForAdmin:findAllUsersForAdmin,
            deleteUserByAdmin:deleteUserByAdmin,
            updateUserByAdmin:updateUserByAdmin
        };

        return api;

        function createUser(user) {
            console.log("In Admin Service :: createUser",user);
            return $http.post("/api/assignment/admin/user",user);
        }

        function findAllUsersForAdmin() {
            console.log("In Admin Service :: findAllUsersForAdmin");
            return $http.get("/api/assignment/admin/user");
        }

        function deleteUserByAdmin(userId) {
            console.log("In Admin Service :: deleteUserByAdmin",userId);
            return $http.delete("/api/assignment/admin/user/"+userId);
        }

        function updateUserByAdmin(userId,user) {
            console.log("In Admin Service :: updateUserByAdmin",user);
            return $http.put("/api/assignment/admin/user/"+userId,user);
        }

    }

})();