(function(){

    angular
    .module("FormBuilderApp")
    .factory("UserService", UserService);

    function UserService () {

        var users = [
        {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
        "username":"alice",  "password":"alice",   "roles": ["student"]                },
        {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
        "username":"bob",    "password":"bob",     "roles": ["admin"]                },
        {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
        "username":"charlie","password":"charlie", "roles": ["faculty"]                },
        {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
        "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
        {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
        "username":"ed",     "password":"ed",      "roles": ["student"]                }
        ];

        var api = {
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
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
            "email" : user.email,
            "roles" : []
        }
        users.push(newUser);
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
                "roles" : user.roles,
                "email" : user.email
            }
            callback(users[userIndex]);
        }
    }




}

})();