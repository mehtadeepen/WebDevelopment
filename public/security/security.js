
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(userModelAssignment,userModelProject) {



    passport.use('assignment',new LocalStrategy(assignmentStrategy));
    passport.use('project',new LocalStrategy(projectStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    var api = {
        getPassport : getPassport

    };

    return api;


    function getPassport() {
        return passport;
    }

    function assignmentStrategy(username, password, done) {
        console.log("In server :: User Service :: assignmentStrategy");
        // lookup developer by username only. cant compare password since it's encrypted
        userModelAssignment
            .findUserByUsername(username)
            .then(
                function(user) {
                    // if the user exists, compare passwords with bcrypt.compareSync
                    console.log("User Found ....",user);
                    console.log(user.password);
                    console.log(password);
                    if(user && bcrypt.compareSync(password, user.password)) {
                        console.log("User Authenticated For Assignment....")
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }


    function projectStrategy(username, password, done) {
        console.log("In server :: User Service :: projectStrategy");
        // lookup developer by username only. cant compare password since it's encrypted
        userModelProject
            .findUserByUsername(username)
            .then(
                function(user) {
                    // if the user exists, compare passwords with bcrypt.compareSync
                    console.log("User Found ....",user);
                    console.log(user.password);
                    console.log(password);
                    if(user && (password === user.password)) {
                        console.log("User Authenticated For Project....")
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {

        if(user.app === "assignment") {
            userModelAssignment
                .findUserByUsername(user.username)
                .then(
                    function(user){
                        delete user.password;
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );

        } else if (user.app === "spidermongo") {
            userModelProject
                .findUserByUsername(user.username)
                .then(
                    function(user){
                        delete user.password;
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }

    }
};