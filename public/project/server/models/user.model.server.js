// load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    // load user schema
    var UserSchema = require("../schemas/user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('spidermongo.user', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUserByUsername: updateUserByUsername,
        createUser: createUser
    };
    return api;

    function updateUserByUsername(username,user) {
        console.log("In project server :: User Model :: updateUserByUsername",user);
        var deferred = q.defer();


        UserModel.findById(user._id,
            function (err, doc){

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    console.log(doc);
                    doc.firstName = user.firstName;
                    doc.lastName = user.lastName;
                    doc.password = user.password;
                    doc.email = user.email;
                    doc.save(function(error){
                        if (error) {
                            console.log(error);
                            deferred.reject(err);
                        }else {
                            deferred.resolve(doc);
                        }

                    });

                }
        });
        return deferred.promise;
    }


    function findUserByUsername(username) {

        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(

            // first argument is predicate
            { username: username},

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }
    function createUser(user) {



        //var newUser = {
        //  username: user.username,
        //    password: user.password,
        //    firstName: "",
        //    lastName: "",
        //    email: user.email
        //};
        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {

        console.log("In project :: User Model :: findUserByCredentials",credentials);
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(

            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }
}
