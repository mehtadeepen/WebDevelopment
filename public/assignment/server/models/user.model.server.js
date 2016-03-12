var mock = require("./user.mock.json");
module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        createUser: createUser,
        findUserById: findUserById,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById,
        findAllUsers: findAllUsers
    };
    return api;

    function findAllUsers() {
        return mock;
    }

    function findUserById(id) {
        for(var u in mock) {
            if( mock[u]._id === id ) {
                return mock[u];
            }
        }
        return null;
    }

    function deleteUserById(id) {
        var index = -1;
        for(var u in mock) {
            if( mock[u]._id === id ) {
                index = u;
                break;
            }
        }

        if(index != -1) {
            mock.splice(index,1);
        }

        return mock;
    }


    function updateUserById(id,user) {
        console.log("In updateUserById");
        console.log(user);
        console.log(id);

        for(var u in mock) {
            if( mock[u]._id == id ) {
                console.log("User Found");
                mock[u].firstName = user.firstName;
                mock[u].lastName = user.lastName;
                mock[u].username = user.username;
                mock[u].password = user.password;
                break;
            }
        }
        return mock;
    }

    function findUserByUsername(username) {
        for(var u in mock) {
            if( mock[u].username === username ) {
                return mock[u];
            }
        }
        return null;
    }

    function createUser(user) {
        user._id = (new Date()).getTime();
        mock.push(user);
        return user;
    }

    function findUserByCredentials(credentials) {
        for(var u in mock) {
            if( mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;
    }
}