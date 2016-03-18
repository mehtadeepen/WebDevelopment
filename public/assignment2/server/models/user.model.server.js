var mock = require("./user.mock.json");
module.exports = function(db,mongoose) {
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
        console.log("In server :: User Model :: findAllUsers :: ");
        return mock;
    }

    function findUserById(id) {
        console.log("In server :: User Model :: findUserById :: ");
        for(var u in mock) {
            if( mock[u]._id === id ) {
                return mock[u];
            }
        }
        return null;
    }

    function deleteUserById(id) {
        console.log("In server :: User Model :: deleteUserById :: "+id);
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
        console.log("In server :: User Model :: updateUserById :: "+id);
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
        console.log("In server :: User Model :: findUserByUsername :: "+username);
        for(var u in mock) {
            if( mock[u].username === username ) {
                return mock[u];
            }
        }
        return null;
    }

    function createUser(user) {
        console.log("In server :: User Model :: createUser :: ");
        user._id = (new Date()).getTime();
        mock.push(user);
        return user;
    }

    function findUserByCredentials(credentials) {
        console.log("In server :: User Model :: findUserByCredentials :: ");
        for(var u in mock) {
            if( mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;
    }
}