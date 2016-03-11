"use strict";
(function(){

    angular
    .module("SpiderMongo")
    .factory("UserService", UserService);

    function UserService () {

        var users = [

        {
            "_id":234,
            "firstName":"John",
            "lastName":"Doe",
            "username":"guest",
            "password":"guest",
            "email": "guest@abc.com"
        }
        ];

        var api = {
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            findUserByUsername : findUserByUsername
        };

        return api;

        function findUserByCredentials(username, password, callback) {

        console.log(username + "..." + password);
         var user = null;
         for (var i = 0; i < users.length; i++) {
            if(users[i].username === username && users[i].password === password){
                user =  users[i];
                console.log(username + "..." + password + "..." + "user found");
            }
        }
        callback(user);
    }


    function findUserByUsername(user, callback) {

        console.log(user.username);
        var oldUser = user ;
         var myUser = null;
         var username = user.username;
         for (var i = 0; i < users.length; i++) {
            if(users[i].username === username){
                myUser =  users[i];
                console.log(user.username + "user found");              
            }
        }

        if(myUser != null) {
             console.log("Sending Null");
            callback(null);
        } else {
            callback(oldUser);
        }
        
    }

    function findAllUsers (callback) {
        callback(users);
    }

    function createUser (user, callback) {
        var id = (new Date).getTime();
        var newUser = {
            "_id" : id,
            "firstName" : "",
            "lastName" : "",
            "username" : user.username,
            "password" : user.password,
            "email" : user.email
        }
        users.push(newUser);
        console.log(newUser);
        callback(newUser);
    }

    function deleteUserById (userId, callback) {

        var index = 0;
        var userIndex = -1;
        for (var i = 0; i < users.length; i++) {
            if(users[i]._id === userId){
                userIndex = index;
            }
            index++;
        }

        if(userIndex != -1) {
            users.splice(userIndex, 1);
            callback(users);
        }
    }

    function updateUser (userId, user, callback) {
        var index = 0;
        var userIndex = -1;
        for (var i = 0; i < users.length; i++) {
            if(users[i]._id === userId){
                userIndex = index;
            }
            index++;
        }

        if(userIndex != -1) {
            users[userIndex] = {
                "_id" : user._id,
                "firstName" : user.firstName,
                "lastName" : user.lastName,
                "username" : user.username,
                "password" : user.password,
                "email" : user.email
            }
            callback(users[userIndex]);
        }
    }




}

})();