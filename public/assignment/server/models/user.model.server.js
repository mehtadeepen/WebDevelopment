
module.exports = function(db,mongoose) {

    var UserSchema = require("./user.schema.server.js")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        createUser: createUser,
        findUserById: findUserById,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById,
        findAllUsers: findAllUsers,
        createUserForAdmin:createUserForAdmin,
        updateUserByIdForAdmin: updateUserByIdForAdmin
    };
    return api;

    function findAllUsers() {
        console.log("In server :: User Model :: findAllUsers :: ");
        return UserModel.find();
    }

    function findUserById(id) {
        console.log("In server :: User Model :: findUserById :: ");
        return UserModel.findById(id);
    }

    function deleteUserById(id) {
        console.log("In server :: User Model :: deleteUserById :: "+id);
        return UserModel.remove({_id: id});
    }


    function updateUserById(id,user) {
        console.log("In server :: User Model :: updateUserById :: "+id);
        delete user._id;
        var emails = user.email.toString().split(",");
        delete user.email;
        user["email"] = emails;
        var phones = user.phone.toString().split(",");
        delete user.phone;
        user["phone"] = phones;
        return UserModel.update({_id: id}, {$set: user},{runValidators: true});
    }

    function updateUserByIdForAdmin(id, user) {
        console.log("In server :: User Model :: updateUserByIdForAdmin :: "+id);
        delete user._id;
        return UserModel.update({_id: id}, {$set: user});
    }

    function findUserByUsername(username) {
        console.log("In server :: User Model :: findUserByUsername :: "+username);
        return UserModel.findOne({username: username});
    }

    function createUser(user) {
        console.log("In server :: User Model :: createUser :: ");
        user.roles = ["student"];
        var emails = user.email.split(",");
        delete user.email;
        user["email"] = emails;
        return UserModel.create(user);
    }


    function createUserForAdmin(user) {
        console.log("In server :: User Model :: createUserForAdmin :: ");
        return UserModel.create(user);
    }

    function findUserByCredentials(credentials) {
        console.log("In server :: User Model :: findUserByCredentials :: ");
        return UserModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            }
        );
    }
}