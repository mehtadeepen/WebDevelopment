"use strict";
(function(){

    angular
    .module("FormBuilderApp")
    .factory("UserService", UserService);

    function UserService ($http, $rootScope) {

        var api = {
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            findUserByUsername : findUserByUsername,
            setCurrentUser: setCurrentUser
        };

        return api;


        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function findUserByCredentials(username, password) {
            console.log(username);
            console.log(password);
            return $http.get("/api/assignment/user?username="+username+"&password="+password);
        }


        function findUserByUsername(username) {
            console.log(username);
            return $http.get("/api/assignment/user?username="+username);
        }

        function findAllUsers () {
            return $http.get("/api/assignment/user");
        }

        function createUser (user) {
            console.log(user);
            return $http.post("/api/assignment/user",user);
        }

        function deleteUserById (userId) {
            console.log(userId);
            return $http.delete("/api/assignment/user/"+userId);
        }

        function updateUser (userId, user) {
            console.log(userId);
            return $http.put("/api/assignment/user/"+userId,user);
        }




}

})();