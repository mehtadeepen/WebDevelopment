"use strict";
(function(){

    angular
        .module("SpiderMongo")
        .factory("UserService", UserService);

    function UserService ($http, $rootScope) {

        var api = {
            findUserByCredentials : findUserByCredentials,
            createUser : createUser,
            updateUser : updateUser,
            findUserByUsername : findUserByUsername,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout

        };

        return api;

        function getCurrentUser() {
            console.log("In project User service client getCurrentUser");
            return $http.get("/api/project/user/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.projectUser = user;
        }

        function findUserByCredentials(username, password) {
            console.log("In project client :: User Service :: findUserByCredentials :: " + username + "..." + password);
            var credentials = {
                username: username,
                password: password
            };
            console.log(credentials);
            return $http.post("/api/project/user/login",credentials);
        }

        function findUserByUsername(username) {
            console.log("In project client :: User Service :: findUserByCredentials :: ");
            return $http.get("/api/project/user/check/"+username);
        }

        function createUser (user) {
            console.log("In project client :: User Service :: createUser :: ");
            return $http.post("/api/project/user",user);
        }

        function updateUser (username, user) {
            console.log("In project client :: User Service :: updateUser :: ");
            return $http.put("/api/project/user/"+username,user);
        }

        function logout(user) {
            delete $rootScope.projectUser;
            return $http.post("/api/project/user/logout",user);
        }

    }
})();